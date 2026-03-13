"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Crop, Upload, Download, Trash2 } from "lucide-react";

type AspectOption = "free" | "1:1" | "4:3" | "16:9" | "3:2";

const ASPECT_RATIOS: Record<AspectOption, number | null> = {
  free: null,
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "3:2": 3 / 2,
};

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [aspect, setAspect] = useState<AspectOption>("free");

  // Selection rectangle in canvas coordinates
  const [selection, setSelection] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const [draggingType, setDraggingType] = useState<
    "move" | "create" | null
  >(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selStart, setSelStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Display scale factor (image pixels to canvas display pixels)
  const [scale, setScale] = useState(1);
  const [imgW, setImgW] = useState(0);
  const [imgH, setImgH] = useState(0);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (selection) {
      // Dim outside selection
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clear selection area
      ctx.clearRect(selection.x, selection.y, selection.w, selection.h);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Re-apply dim outside
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      // Top
      ctx.fillRect(0, 0, canvas.width, selection.y);
      // Bottom
      ctx.fillRect(
        0,
        selection.y + selection.h,
        canvas.width,
        canvas.height - selection.y - selection.h
      );
      // Left
      ctx.fillRect(0, selection.y, selection.x, selection.h);
      // Right
      ctx.fillRect(
        selection.x + selection.w,
        selection.y,
        canvas.width - selection.x - selection.w,
        selection.h
      );

      // Draw selection border
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.strokeRect(selection.x, selection.y, selection.w, selection.h);
      ctx.setLineDash([]);
    }
  }, [selection]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const loadImageToCanvas = useCallback((src: string) => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      const maxW = container ? container.clientWidth : 600;
      const maxH = 500;

      const s = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      setScale(s);
      setImgW(img.naturalWidth);
      setImgH(img.naturalHeight);

      canvas.width = Math.round(img.naturalWidth * s);
      canvas.height = Math.round(img.naturalHeight * s);

      // Set default selection to full image
      setSelection({
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height,
      });
    };
    img.src = src;
  }, []);

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setFile(f);
      if (imageSrc) URL.revokeObjectURL(imageSrc);
      const url = URL.createObjectURL(f);
      setImageSrc(url);
      setSelection(null);
      loadImageToCanvas(url);
    },
    [imageSrc, loadImageToCanvas]
  );

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

  const getCanvasPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
        clientY = e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    []
  );

  const clampSelection = useCallback(
    (sel: { x: number; y: number; w: number; h: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return sel;
      let { x, y, w, h } = sel;

      // Ensure positive dimensions
      if (w < 0) {
        x += w;
        w = -w;
      }
      if (h < 0) {
        y += h;
        h = -h;
      }

      // Clamp within canvas
      x = Math.max(0, Math.min(x, canvas.width - 1));
      y = Math.max(0, Math.min(y, canvas.height - 1));
      w = Math.min(w, canvas.width - x);
      h = Math.min(h, canvas.height - y);

      return { x, y, w, h };
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const pos = getCanvasPos(e);

      // Check if inside existing selection -> move
      if (
        selection &&
        pos.x >= selection.x &&
        pos.x <= selection.x + selection.w &&
        pos.y >= selection.y &&
        pos.y <= selection.y + selection.h
      ) {
        setDraggingType("move");
        setDragStart(pos);
        setSelStart({ ...selection });
      } else {
        // Create new selection
        setDraggingType("create");
        setDragStart(pos);
        setSelection({ x: pos.x, y: pos.y, w: 0, h: 0 });
      }
    },
    [selection, getCanvasPos]
  );

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!draggingType) return;
      e.preventDefault();
      const pos = getCanvasPos(e);
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (draggingType === "move") {
        const dx = pos.x - dragStart.x;
        const dy = pos.y - dragStart.y;
        setSelection(
          clampSelection({
            x: selStart.x + dx,
            y: selStart.y + dy,
            w: selStart.w,
            h: selStart.h,
          })
        );
      } else if (draggingType === "create") {
        let w = pos.x - dragStart.x;
        let h = pos.y - dragStart.y;

        const lockedAspect = ASPECT_RATIOS[aspect];
        if (lockedAspect !== null) {
          const absW = Math.abs(w);
          const absH = Math.abs(h);
          if (absW / lockedAspect > absH) {
            h = (absW / lockedAspect) * Math.sign(h || 1);
          } else {
            w = absH * lockedAspect * Math.sign(w || 1);
          }
        }

        setSelection(
          clampSelection({
            x: dragStart.x,
            y: dragStart.y,
            w,
            h,
          })
        );
      }
    },
    [draggingType, dragStart, selStart, aspect, getCanvasPos, clampSelection]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingType(null);
  }, []);

  const cropAndDownload = useCallback(() => {
    if (!selection || !imageRef.current || !file) {
      toast.error("Please make a selection first");
      return;
    }

    const { x, y, w, h } = selection;
    if (w < 2 || h < 2) {
      toast.error("Selection is too small");
      return;
    }

    // Convert canvas coords to image coords
    const srcX = Math.round(x / scale);
    const srcY = Math.round(y / scale);
    const srcW = Math.round(w / scale);
    const srcH = Math.round(h / scale);

    const canvas = document.createElement("canvas");
    canvas.width = srcW;
    canvas.height = srcH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error("Canvas context not available");
      return;
    }

    ctx.drawImage(
      imageRef.current,
      srcX,
      srcY,
      srcW,
      srcH,
      0,
      0,
      srcW,
      srcH
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Failed to crop image");
          return;
        }
        const url = URL.createObjectURL(blob);
        const baseName = file.name.replace(/\.[^.]+$/, "");
        const link = document.createElement("a");
        link.download = `${baseName}-cropped.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Cropped image downloaded!");
      },
      "image/png"
    );
  }, [selection, scale, file]);

  const reset = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setFile(null);
    setImageSrc(null);
    setSelection(null);
    setAspect("free");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [imageSrc]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crop className="h-5 w-5" />
          Image Cropper
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Badge variant="secondary">
                {imgW} x {imgH}
              </Badge>
              <Button onClick={reset} variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Aspect Ratio</label>
              <Select
                value={aspect}
                onValueChange={(val) => setAspect(val as AspectOption)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="3:2">3:2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border overflow-hidden bg-muted/30 flex justify-center">
              <canvas
                ref={canvasRef}
                className="cursor-crosshair max-w-full"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              />
            </div>

            {selection && selection.w > 0 && selection.h > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  Crop area: {Math.round(selection.w / scale)} x{" "}
                  {Math.round(selection.h / scale)} px
                </span>
              </div>
            )}

            <Button onClick={cropAndDownload} className="w-full">
              <Download className="h-4 w-4" />
              Crop &amp; Download
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
