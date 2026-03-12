import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { ImageCompressor } from "@/components/tools/image-compressor";

export const metadata: Metadata = {
  title: "Image Compressor — Compress Images in Your Browser",
  description: "Compress JPEG, PNG, and WebP images directly in your browser. Reduce file size while maintaining quality. No uploads — 100% private.",
  alternates: { canonical: "/tools/image-compressor" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Image Compressor"
      description="Compress your images directly in the browser with no server uploads. Reduce file sizes while preserving visual quality for faster page loads."
      howToUse={[
        "Drag and drop an image or click to select a JPEG, PNG, or WebP file from your device.",
        "Adjust the quality slider to balance between file size and visual quality.",
        "Download the compressed image and compare the before-and-after file sizes.",
      ]}
      faqs={[
        { question: "Are my images uploaded to a server?", answer: "No. All image compression happens entirely in your browser using client-side JavaScript. Your images never leave your device, ensuring complete privacy." },
        { question: "What image formats are supported?", answer: "This tool supports JPEG, PNG, and WebP formats. JPEG works best for photographs, PNG for graphics with transparency, and WebP for modern web optimization with smaller file sizes." },
        { question: "How much can I reduce file size without losing quality?", answer: "Typically, JPEG images can be compressed by 50-80% with minimal visible quality loss. PNG files with large areas of solid color can see even greater reductions. The optimal setting depends on the image content." },
      ]}
    >
      <ImageCompressor />
    </ToolPageWrapper>
  );
}
