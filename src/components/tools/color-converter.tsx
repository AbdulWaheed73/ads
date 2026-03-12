"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Copy } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) {
    const s = hex.replace("#", "").match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (!s) return null;
    return { r: parseInt(s[1] + s[1], 16), g: parseInt(s[2] + s[2], 16), b: parseInt(s[3] + s[3], 16) };
  }
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function generatePalette(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [10, 20, 30, 40, 50, 60, 70, 80, 90, 95].map((l) => {
    const { r, g, b } = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
  });
}

export function ColorConverter() {
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number } | null>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<{ h: number; s: number; l: number } | null>({ h: 217, s: 91, l: 60 });
  const [contrastBg, setContrastBg] = useState("#ffffff");
  const [palette, setPalette] = useState<string[]>(() => generatePalette("#3b82f6"));

  const updateFromHex = useCallback((hex: string) => {
    setHexInput(hex);
    const result = hexToRgb(hex);
    if (result) {
      setRgb(result);
      setHsl(rgbToHsl(result.r, result.g, result.b));
      setPalette(generatePalette(hex));
    }
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    setHsl(rgbToHsl(r, g, b));
    setPalette(generatePalette(hex));
  }, []);

  const contrastRatio = rgb
    ? getContrastRatio(rgb, hexToRgb(contrastBg) || { r: 255, g: 255, b: 255 })
    : 0;

  const wcagAA = contrastRatio >= 4.5;
  const wcagAAA = contrastRatio >= 7;
  const wcagAALarge = contrastRatio >= 3;

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Converter & Palette
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Picker + Hex Input */}
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={hexInput}
            onChange={(e) => updateFromHex(e.target.value)}
            className="h-12 w-12 rounded-md border cursor-pointer"
          />
          <div className="flex-1 space-y-1">
            <label className="text-xs text-muted-foreground">HEX</label>
            <div className="flex gap-2">
              <Input
                value={hexInput}
                onChange={(e) => updateFromHex(e.target.value)}
                className="font-mono text-sm"
              />
              <Button variant="ghost" size="icon" onClick={() => copyValue(hexInput)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* RGB */}
        {rgb && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">RGB</label>
              <Button variant="ghost" size="sm" onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">R</label>
                <Input
                  type="number" min={0} max={255}
                  value={rgb.r}
                  onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">G</label>
                <Input
                  type="number" min={0} max={255}
                  value={rgb.g}
                  onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">B</label>
                <Input
                  type="number" min={0} max={255}
                  value={rgb.b}
                  onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* HSL */}
        {hsl && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">HSL</label>
              <Button variant="ghost" size="sm" onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
            <div className="rounded-md border bg-muted/30 px-3 py-2">
              <code className="text-sm font-mono">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </code>
            </div>
          </div>
        )}

        {/* WCAG Contrast Checker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">WCAG Contrast Checker</label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Background:</span>
            <input
              type="color"
              value={contrastBg}
              onChange={(e) => setContrastBg(e.target.value)}
              className="h-8 w-8 rounded border cursor-pointer"
            />
            <Input
              value={contrastBg}
              onChange={(e) => setContrastBg(e.target.value)}
              className="w-28 font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">Ratio: {contrastRatio.toFixed(2)}:1</Badge>
            <Badge variant={wcagAALarge ? "default" : "destructive"}>
              AA Large: {wcagAALarge ? "Pass" : "Fail"}
            </Badge>
            <Badge variant={wcagAA ? "default" : "destructive"}>
              AA: {wcagAA ? "Pass" : "Fail"}
            </Badge>
            <Badge variant={wcagAAA ? "default" : "destructive"}>
              AAA: {wcagAAA ? "Pass" : "Fail"}
            </Badge>
          </div>
          <div
            className="rounded-md p-4 text-center text-sm font-medium"
            style={{ backgroundColor: contrastBg, color: hexInput }}
          >
            Sample Text — The quick brown fox jumps over the lazy dog
          </div>
        </div>

        {/* Palette */}
        {palette.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Generated Palette</label>
            <div className="flex rounded-lg overflow-hidden border">
              {palette.map((color, i) => (
                <button
                  key={i}
                  className="flex-1 h-10 cursor-pointer transition-transform hover:scale-y-125"
                  style={{ backgroundColor: color }}
                  title={color}
                  onClick={() => copyValue(color)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {palette.map((color, i) => (
                <code key={i} className="text-xs text-muted-foreground">{color}</code>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
