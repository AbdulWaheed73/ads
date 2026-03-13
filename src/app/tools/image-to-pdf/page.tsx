import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { ImageToPdf } from "@/components/tools/image-to-pdf";

export const metadata: Metadata = {
  title: "Image to PDF Converter — Convert Images to PDF Online",
  description:
    "Convert JPEG, PNG, and WebP images to a PDF document. Combine multiple images into one PDF with custom page sizes. 100% browser-based.",
  alternates: { canonical: "/tools/image-to-pdf" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Image to PDF Converter"
      slug="image-to-pdf"
      description="Convert one or multiple images into a single PDF document directly in your browser. Upload JPEG, PNG, or WebP files, reorder them by dragging, choose a page size, and download a neatly formatted PDF in seconds. No server uploads, no file size limits imposed by a backend — everything is processed on your device for maximum speed and privacy."
      howToUse={[
        "Upload one or more images by dragging them onto the drop zone or clicking to browse your files.",
        "Reorder the images by dragging them into the desired sequence and select your preferred page size (A4, Letter, etc.).",
        "Click Convert to PDF to generate the document, then download it instantly.",
      ]}
      faqs={[
        {
          question: "Which image formats can I convert to PDF?",
          answer:
            "This tool accepts the most common image formats: JPEG, PNG, and WebP. JPEG and WebP images are embedded directly with their existing compression. PNG images, including those with transparency, are also supported — transparent areas will appear as white in the resulting PDF since the PDF format does not support transparency in the same way.",
        },
        {
          question: "What page sizes are available?",
          answer:
            "You can choose from standard page sizes including A4 (210 x 297 mm), US Letter (8.5 x 11 in), A3, Legal, and a fit-to-image option that sizes each page to match its image dimensions exactly. The fit-to-image option is useful when you want to preserve the original resolution without any margins or scaling.",
        },
        {
          question: "Can I combine multiple images into a multi-page PDF?",
          answer:
            "Yes, that is one of the primary features. Upload as many images as you like, drag them into your preferred order, and the tool will place each image on its own page within a single PDF. Each image is scaled to fit the chosen page size while maintaining its aspect ratio, so nothing gets cropped or distorted.",
        },
      ]}
    >
      <ImageToPdf />
    </ToolPageWrapper>
  );
}
