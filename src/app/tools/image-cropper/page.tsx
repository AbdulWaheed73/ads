import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { ImageCropper } from "@/components/tools/image-cropper";

export const metadata: Metadata = {
  title: "Image Cropper — Crop Images Online for Free",
  description:
    "Crop images to exact dimensions or preset aspect ratios. Supports touch gestures, free-form selection, and instant download. Fully browser-based.",
  alternates: { canonical: "/tools/image-cropper" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Image Cropper"
      slug="image-cropper"
      description="Crop any image to the exact dimensions you need, entirely in your browser. Upload a photo, drag the crop region, and download the result instantly. Choose from preset aspect ratios for social media and common print sizes, or go free-form for full control. The tool works on desktop and mobile with full touch and pinch-to-zoom support, and your images never leave your device."
      howToUse={[
        "Upload an image by dragging it onto the drop zone or clicking to select a file from your device.",
        "Drag the crop handles to select the area you want to keep, or choose a preset aspect ratio like 1:1, 16:9, or 4:3.",
        "Click Crop to finalize your selection and download the cropped image in its original format.",
      ]}
      faqs={[
        {
          question: "What aspect ratio presets are available?",
          answer:
            "The tool includes presets for the most common use cases: 1:1 (square, ideal for profile pictures and Instagram posts), 16:9 (widescreen for YouTube thumbnails and presentations), 4:3 (classic photo ratio), 3:2 (standard DSLR ratio), and 9:16 (vertical for stories and reels). You can also enter custom width and height values for any ratio you need.",
        },
        {
          question: "Does cropping reduce image quality?",
          answer:
            "Cropping itself does not degrade quality — it simply removes the outer pixels and keeps the selected region at its original resolution. However, if you crop a very small area from a large image, the resulting image will have fewer pixels and may appear lower quality if you then scale it up. For best results, start with the highest resolution source image available.",
        },
        {
          question: "Does the tool work on mobile with touch gestures?",
          answer:
            "Yes, the cropper is fully optimized for touch devices. You can drag the crop region with one finger, resize it by dragging corner handles, and use pinch-to-zoom to adjust the view on the image. The interface adapts to smaller screens so that all controls remain accessible, making it just as easy to crop images on a phone or tablet as on a desktop.",
        },
      ]}
    >
      <ImageCropper />
    </ToolPageWrapper>
  );
}
