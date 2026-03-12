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
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          toast.error("Canvas context not available");
          return;
        }

        ctx.drawImage(bitmap, 0, 0);

        let outputType = "image/jpeg";
        if (file.type === "image/png") outputType = "image/png";
        if (file.type === "image/webp") outputType = "image/webp";

        // PNG does not support quality parameter, convert to JPEG for compression
        if (outputType === "image/png" && qualityValue < 100) {
          outputType = "image/jpeg";
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
        toast.error("Failed to compress image");
      } finally {
        setIsCompressing(false);
      }
    },
    [compressedUrl]
  );

  const handleFile = useCallback(
    (file: File) => {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a JPEG, PNG, or WebP image");
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
    if (!compressedUrl || !originalFile) return;

    const ext = compressedBlob?.type === "image/webp" ? "webp" : "jpg";
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
          accept="image/jpeg,image/png,image/webp"
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
                Supports JPEG, PNG, and WebP
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
