import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { ImageResizer } from "@/components/tools/image-resizer";

export const metadata: Metadata = {
  title: "Image Resizer — Resize Images Online for Free",
  description:
    "Resize images to exact dimensions or by percentage. Supports JPEG, PNG, and WebP with quality control. 100% browser-based — no uploads.",
  alternates: { canonical: "/tools/image-resizer" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Image Resizer"
      slug="image-resizer"
      description="Resize any image to exact pixel dimensions or scale it by percentage, all without leaving your browser. Upload a JPEG, PNG, or WebP file, set your target size, and download the resized version instantly. Lock the aspect ratio to prevent distortion, adjust output quality, and choose your preferred format. Your images are processed entirely on your device and never uploaded to any server."
      howToUse={[
        "Drag and drop an image onto the upload area or click to select a file from your device.",
        "Enter your desired width and height in pixels, or use the percentage slider to scale proportionally.",
        "Click Resize, preview the result, and download the resized image in your chosen format.",
      ]}
      faqs={[
        {
          question: "Will resizing reduce the quality of my image?",
          answer:
            "Downscaling an image (making it smaller) generally preserves quality well because pixels are merged rather than invented. Upscaling (making it larger) can introduce blurriness since new pixel data must be interpolated. For JPEG and WebP outputs, you can also control the compression quality slider to balance file size against visual fidelity.",
        },
        {
          question: "Which image formats are supported?",
          answer:
            "This tool supports the most common web image formats: JPEG, PNG, and WebP. JPEG is best for photographs due to its efficient lossy compression. PNG is ideal for graphics, logos, and images requiring transparency. WebP offers superior compression for both lossy and lossless images and is supported by all modern browsers.",
        },
        {
          question: "What dimensions should I use for social media?",
          answer:
            "Recommended sizes vary by platform. For Instagram posts use 1080x1080 px, stories 1080x1920 px. Facebook recommends 1200x630 px for shared links and 820x312 px for cover photos. Twitter/X images display best at 1200x675 px. LinkedIn post images work well at 1200x627 px. These sizes ensure your images display sharply without being cropped unexpectedly.",
        },
      ]}
    >
      <ImageResizer />
    </ToolPageWrapper>
  );
}
