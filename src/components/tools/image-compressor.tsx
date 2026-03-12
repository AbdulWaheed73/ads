"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Image as ImageIcon, Trash2 } from "lucide-react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function getMimeFromExtension(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    bmp: "image/bmp",
    avif: "image/avif",
    tiff: "image/tiff",
    tif: "image/tiff",
  };
  return ext ? map[ext] ?? null : null;
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState([80]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(
    async (file: File, qualityValue: number) => {
      setIsCompressing(true);

      try {
        // Try createImageBitmap first, fall back to Image element
        let source: HTMLImageElement | ImageBitmap;
        try {
          source = await createImageBitmap(file);
        } catch {
          source = await loadImageElement(file);
        }

        const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
        const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          toast.error("Canvas context not available");
          return;
        }

        // Detect MIME type with extension fallback
        const mime = file.type || getMimeFromExtension(file.name) || "image/jpeg";

        let outputType = mime;
        // Only support output types the canvas can produce
        if (!["image/jpeg", "image/png", "image/webp"].includes(outputType)) {
          outputType = "image/jpeg";
        }

        // PNG does not support quality parameter, convert to JPEG for compression
        if (outputType === "image/png" && qualityValue < 100) {
          outputType = "image/jpeg";
        }

        // Fill canvas with white background for JPEG output (prevents black transparency)
        if (outputType === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(source, 0, 0);

        // Clean up Image element URL if used
        if (source instanceof HTMLImageElement) {
          URL.revokeObjectURL(source.src);
        }

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, outputType, qualityValue / 100);
        });

        if (!blob) {
          toast.error("Failed to compress image");
          return;
        }

        setCompressedBlob(blob);
        setCompressedSize(blob.size);

        if (compressedUrl) {
          URL.revokeObjectURL(compressedUrl);
        }
        const url = URL.createObjectURL(blob);
        setCompressedUrl(url);
      } catch {
        toast.error("Failed to compress image. The image format may not be supported by your browser.");
      } finally {
        setIsCompressing(false);
      }
    },
    [compressedUrl]
  );

  const handleFile = useCallback(
    (file: File) => {
      const mime = file.type || getMimeFromExtension(file.name);

      // Reject SVG files
      if (mime === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
        toast.error("SVG files are not supported. Please use a raster image format.");
        return;
      }

      // Accept any image type that the browser can decode
      if (!mime || !mime.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      setOriginalFile(file);
      setOriginalSize(file.size);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      compressImage(file, quality[0]);
    },
    [previewUrl, quality, compressImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
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
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleQualityChange = useCallback(
    (value: number | readonly number[]) => {
      const arr = Array.isArray(value) ? [...value] : [value];
      setQuality(arr);
      if (originalFile) {
        compressImage(originalFile, arr[0]);
      }
    },
    [originalFile, compressImage]
  );

  const downloadCompressed = useCallback(() => {
    if (!compressedUrl || !originalFile || !compressedBlob) return;

    const extMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const ext = extMap[compressedBlob.type] || "jpg";
    const baseName = originalFile.name.replace(/\.[^.]+$/, "");

    const link = document.createElement("a");
    link.download = `${baseName}-compressed.${ext}`;
    link.href = compressedUrl;
    link.click();
    toast.success("Compressed image downloaded!");
  }, [compressedUrl, compressedBlob, originalFile]);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalFile(null);
    setOriginalSize(0);
    setCompressedBlob(null);
    setCompressedSize(0);
    setPreviewUrl(null);
    setCompressedUrl(null);
    setQuality([80]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl, compressedUrl]);

  const savedPercent =
    originalSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Compressor
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

        {!originalFile ? (
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
                Supports JPEG, PNG, WebP, GIF, BMP, AVIF, and more
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Quality: {quality[0]}%
                </label>
                <Button
                  onClick={reset}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
              <Slider
                value={quality}
                onValueChange={handleQualityChange}
                min={1}
                max={100}
                step={1}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Original:</span>
                <Badge variant="secondary">{formatBytes(originalSize)}</Badge>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Compressed:
                </span>
                <Badge variant="secondary">{formatBytes(compressedSize)}</Badge>
              </div>
              {savedPercent > 0 && (
                <Badge variant="default">{savedPercent}% saved</Badge>
              )}
              {savedPercent <= 0 && compressedSize > 0 && (
                <Badge variant="destructive">No reduction</Badge>
              )}
            </div>

            {compressedUrl && (
              <div className="space-y-4">
                <div className="rounded-lg border overflow-hidden bg-muted/30">
                  <img
                    src={compressedUrl}
                    alt="Compressed preview"
                    className="max-w-full max-h-[400px] mx-auto object-contain"
                  />
                </div>
                <Button
                  onClick={downloadCompressed}
                  className="w-full"
                  disabled={isCompressing}
                >
                  <Download className="h-4 w-4" />
                  Download Compressed Image
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
