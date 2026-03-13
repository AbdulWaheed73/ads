"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scaling, Upload, Download, Trash2 } from "lucide-react";

interface Preset {
  label: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Facebook Cover", width: 820, height: 312 },
  { label: "Twitter Header", width: 1500, height: 500 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
  { label: "LinkedIn Banner", width: 1584, height: 396 },
];

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatio = originalWidth > 0 ? originalWidth / originalHeight : 1;

  const handleFile = useCallback(async (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    try {
      const img = await loadImage(f);
      setFile(f);
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setResizedUrl(null);

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(f));
    } catch {
      toast.error("Failed to load image");
    }
  }, [previewUrl]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleWidthChange = useCallback(
    (val: string) => {
      const w = parseInt(val) || 0;
      setWidth(w);
      if (lockAspect && w > 0) {
        setHeight(Math.round(w / aspectRatio));
      }
    },
    [lockAspect, aspectRatio]
  );

  const handleHeightChange = useCallback(
    (val: string) => {
      const h = parseInt(val) || 0;
      setHeight(h);
      if (lockAspect && h > 0) {
        setWidth(Math.round(h * aspectRatio));
      }
    },
    [lockAspect, aspectRatio]
  );

  const applyPreset = useCallback((value: string | null) => {
    if (!value) return;
    const preset = PRESETS.find((p) => p.label === value);
    if (preset) {
      setWidth(preset.width);
      setHeight(preset.height);
      setLockAspect(false);
    }
  }, []);

  const resizeImage = useCallback(async () => {
    if (!file || width <= 0 || height <= 0) {
      toast.error("Please set valid dimensions");
      return;
    }

    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Canvas context not available");
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(img.src);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        toast.error("Failed to resize image");
        return;
      }

      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
      setResizedUrl(URL.createObjectURL(blob));
      toast.success(`Image resized to ${width}x${height}`);
    } catch {
      toast.error("Failed to resize image");
    } finally {
      setIsProcessing(false);
    }
  }, [file, width, height, resizedUrl]);

  const downloadResized = useCallback(() => {
    if (!resizedUrl || !file) return;
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const link = document.createElement("a");
    link.download = `${baseName}-${width}x${height}.png`;
    link.href = resizedUrl;
    link.click();
    toast.success("Resized image downloaded!");
  }, [resizedUrl, file, width, height]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setFile(null);
    setPreviewUrl(null);
    setResizedUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    setLockAspect(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl, resizedUrl]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scaling className="h-5 w-5" />
          Image Resizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-12 cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">
                Drop an image here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPEG, PNG, WebP, and more
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                Original: {originalWidth} x {originalHeight}
              </Badge>
              <Button onClick={reset} variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Social Media Presets
                </label>
                <Select onValueChange={applyPreset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a preset..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((p) => (
                      <SelectItem key={p.label} value={p.label}>
                        {p.label} ({p.width}x{p.height})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-1">
                  <label className="text-sm font-medium">Width (px)</label>
                  <Input
                    type="number"
                    min={1}
                    value={width || ""}
                    onChange={(e) => handleWidthChange(e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-sm font-medium">Height (px)</label>
                  <Input
                    type="number"
                    min={1}
                    value={height || ""}
                    onChange={(e) => handleHeightChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={lockAspect}
                  onCheckedChange={setLockAspect}
                />
                <label className="text-sm font-medium">
                  Lock aspect ratio
                </label>
              </div>
            </div>

            <Button
              onClick={resizeImage}
              className="w-full"
              disabled={isProcessing || width <= 0 || height <= 0}
            >
              {isProcessing ? "Resizing..." : "Resize Image"}
            </Button>

            {resizedUrl && (
              <div className="space-y-4">
                <div className="rounded-lg border overflow-hidden bg-muted/30">
                  <img
                    src={resizedUrl}
                    alt="Resized preview"
                    className="max-w-full max-h-[400px] mx-auto object-contain"
                  />
                </div>
                <Button onClick={downloadResized} className="w-full">
                  <Download className="h-4 w-4" />
                  Download Resized Image
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
