"use client";

import { useState, useCallback } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, QrCode } from "lucide-react";

export function QrGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const generateQR = useCallback(async () => {
    if (!text.trim()) {
      toast.error("Please enter a URL or text");
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrDataUrl(dataUrl);
      toast.success("QR code generated!");
    } catch {
      toast.error("Failed to generate QR code");
    }
  }, [text, size, fgColor, bgColor]);

  const downloadQR = useCallback(() => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
    toast.success("QR code downloaded!");
  }, [qrDataUrl]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">URL or Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com or any text"
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <Select value={size} onValueChange={(val) => setSize(Number(val))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={128}>128 x 128</SelectItem>
                <SelectItem value={256}>256 x 256</SelectItem>
                <SelectItem value={512}>512 x 512</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-input bg-transparent p-1"
              />
              <span className="text-sm text-muted-foreground">{fgColor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-input bg-transparent p-1"
              />
              <span className="text-sm text-muted-foreground">{bgColor}</span>
            </div>
          </div>
        </div>

        <Button onClick={generateQR} className="w-full">
          Generate QR Code
        </Button>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-4 pt-4 border-t">
            <div className="rounded-lg border bg-white p-4">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                width={size}
                height={size}
                className="max-w-full h-auto"
              />
            </div>
            <Button onClick={downloadQR} variant="outline">
              <Download className="h-4 w-4" />
              Download PNG
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
