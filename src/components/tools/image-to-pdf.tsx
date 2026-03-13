"use client";

import { useState, useRef, useCallback } from "react";
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
import { FileOutput, Upload, Trash2, ArrowUp, ArrowDown } from "lucide-react";

type PageSize = "a4" | "letter" | "fit";

const PAGE_SIZES: Record<string, { label: string; width: number; height: number }> = {
  a4: { label: "A4 (210 x 297 mm)", width: 595.28, height: 841.89 },
  letter: { label: "Letter (8.5 x 11 in)", width: 612, height: 792 },
  fit: { label: "Fit to Image", width: 0, height: 0 },
};

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

// Minimal PDF builder - creates a valid PDF binary from image data
function buildPdf(
  pages: { width: number; height: number; jpegData: Uint8Array }[]
): Uint8Array {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let pos = 0;

  function write(str: string) {
    const data = encoder.encode(str);
    chunks.push(data);
    pos += data.length;
  }

  function writeBytes(data: Uint8Array) {
    chunks.push(data);
    pos += data.length;
  }

  function objOffset() {
    offsets.push(pos);
  }

  // Header
  write("%PDF-1.4\n");

  // Object 1: Catalog
  objOffset();
  write("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Object 2: Pages (will list kids)
  const pageObjStart = 3;
  const kidsRefs = pages
    .map((_, i) => `${pageObjStart + i * 3} 0 R`)
    .join(" ");

  objOffset();
  write(
    `2 0 obj\n<< /Type /Pages /Kids [${kidsRefs}] /Count ${pages.length} >>\nendobj\n`
  );

  // For each page: Page obj, Image XObject, Content stream
  let nextObj = pageObjStart;
  for (const page of pages) {
    const pageObj = nextObj;
    const imgObj = nextObj + 1;
    const contentObj = nextObj + 2;
    nextObj += 3;

    // Page object
    objOffset();
    write(
      `${pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width.toFixed(
        2
      )} ${page.height.toFixed(
        2
      )}] /Contents ${contentObj} 0 R /Resources << /XObject << /Img ${imgObj} 0 R >> >> >>\nendobj\n`
    );

    // Image XObject
    objOffset();
    write(
      `${imgObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${page.width.toFixed(
        0
      )} /Height ${page.height.toFixed(
        0
      )} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${
        page.jpegData.length
      } >>\nstream\n`
    );
    writeBytes(page.jpegData);
    write("\nendstream\nendobj\n");

    // Content stream - draw image scaled to page
    const contentStr = `q ${page.width.toFixed(2)} 0 0 ${page.height.toFixed(
      2
    )} 0 0 cm /Img Do Q`;
    objOffset();
    write(
      `${contentObj} 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}\nendstream\nendobj\n`
    );
  }

  // XRef
  const xrefPos = pos;
  write("xref\n");
  write(`0 ${offsets.length + 1}\n`);
  write("0000000000 65535 f \n");
  for (const off of offsets) {
    write(`${off.toString().padStart(10, "0")} 00000 n \n`);
  }

  // Trailer
  write("trailer\n");
  write(
    `<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`
  );

  // Combine all chunks
  const totalLen = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

export function ImageToPdf() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    async (files: FileList) => {
      const newEntries: ImageEntry[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        try {
          const img = await loadImage(file);
          newEntries.push({
            id: `${Date.now()}-${i}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file),
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
          URL.revokeObjectURL(img.src);
        } catch {
          toast.error(`Failed to load ${file.name}`);
        }
      }
      if (newEntries.length === 0) {
        toast.error("No valid images found");
        return;
      }
      setImages((prev) => [...prev, ...newEntries]);
      toast.success(`Added ${newEntries.length} image(s)`);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles]
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
      if (e.target.files && e.target.files.length > 0) {
        addFiles(e.target.files);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [addFiles]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((p) => p.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const moveImage = useCallback((id: string, direction: "up" | "down") => {
    setImages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx < 0) return prev;
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }, []);

  const generatePdf = useCallback(async () => {
    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    setIsGenerating(true);
    try {
      const pageData: { width: number; height: number; jpegData: Uint8Array }[] = [];

      for (const entry of images) {
        const img = await loadImage(entry.file);

        let pageW: number;
        let pageH: number;

        if (pageSize === "fit") {
          pageW = img.naturalWidth;
          pageH = img.naturalHeight;
        } else {
          const ps = PAGE_SIZES[pageSize];
          pageW = ps.width;
          pageH = ps.height;
        }

        // Scale image to fit page while maintaining aspect ratio
        const canvas = document.createElement("canvas");
        let drawW = pageW;
        let drawH = pageH;

        if (pageSize !== "fit") {
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const pageAspect = pageW / pageH;
          if (imgAspect > pageAspect) {
            drawW = pageW;
            drawH = pageW / imgAspect;
          } else {
            drawH = pageH;
            drawW = pageH * imgAspect;
          }
        }

        canvas.width = Math.round(pageW);
        canvas.height = Math.round(pageH);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center the image on the page
        const offsetX = (pageW - drawW) / 2;
        const offsetY = (pageH - drawH) / 2;
        ctx.drawImage(
          img,
          Math.round(offsetX),
          Math.round(offsetY),
          Math.round(drawW),
          Math.round(drawH)
        );
        URL.revokeObjectURL(img.src);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.92)
        );

        if (!blob) throw new Error("Failed to convert image");

        const arrayBuf = await blob.arrayBuffer();
        pageData.push({
          width: Math.round(pageW),
          height: Math.round(pageH),
          jpegData: new Uint8Array(arrayBuf),
        });
      }

      const pdfBytes = buildPdf(pageData);
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = "images.pdf";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast.success("PDF generated and downloaded!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate PDF"
      );
    } finally {
      setIsGenerating(false);
    }
  }, [images, pageSize]);

  const clearAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  }, [images]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileOutput className="h-5 w-5" />
          Image to PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium">
              Drop images here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Select multiple images to combine into a single PDF
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {images.length} image{images.length !== 1 ? "s" : ""}
              </Badge>
              <Button onClick={clearAll} variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>

            <div className="space-y-2">
              {images.map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 rounded-lg border p-2"
                >
                  <img
                    src={entry.previewUrl}
                    alt={entry.file.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {entry.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.width} x {entry.height}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(entry.id, "up")}
                      disabled={idx === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveImage(entry.id, "down")}
                      disabled={idx === images.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Page Size</label>
              <Select
                value={pageSize}
                onValueChange={(val) => setPageSize(val as PageSize)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAGE_SIZES).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generatePdf}
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating PDF..." : "Generate PDF & Download"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
