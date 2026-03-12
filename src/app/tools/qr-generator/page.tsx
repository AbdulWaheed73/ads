import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { QrGenerator } from "@/components/tools/qr-generator";

export const metadata: Metadata = {
  title: "QR Code Generator — Create Custom QR Codes Free",
  description: "Generate free QR codes for URLs, text, Wi-Fi, and more. Customize colors and size, then download as PNG or SVG. No sign-up required.",
  alternates: { canonical: "/tools/qr-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="QR Code Generator"
      description="Create custom QR codes for URLs, text, Wi-Fi credentials, and more. Customize colors and download in PNG or SVG format."
      howToUse={[
        "Enter the URL, text, or data you want to encode into a QR code.",
        "Customize the QR code colors and size to match your branding.",
        "Download the generated QR code as a PNG or SVG file for use in print or digital media.",
      ]}
      faqs={[
        { question: "Do QR codes expire?", answer: "Static QR codes that encode data directly (like this tool generates) never expire. They will work as long as the destination URL remains active." },
        { question: "What is the maximum amount of data a QR code can hold?", answer: "A QR code can store up to 4,296 alphanumeric characters or 7,089 numeric characters. However, shorter data produces simpler QR codes that are easier and faster to scan." },
        { question: "What size should a QR code be for printing?", answer: "A general rule is that a QR code should be at least 2 cm x 2 cm (0.8 in x 0.8 in) for close-range scanning. For posters or billboards, scale up proportionally based on the expected scanning distance." },
      ]}
    >
      <QrGenerator />
    </ToolPageWrapper>
  );
}
