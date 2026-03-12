import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { Base64Encoder } from "@/components/tools/base64-encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode and Decode Base64 Online",
  description: "Free online Base64 encoder and decoder. Convert text to Base64, decode Base64 strings, and convert files to Base64 data URLs instantly in your browser.",
  alternates: { canonical: "/tools/base64-encoder" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Base64 Encoder & Decoder"
      slug="base64-encoder"
      description="Encode text to Base64, decode Base64 strings, or convert files to Base64 data URLs — all in your browser."
      howToUse={[
        "Choose Encode, Decode, or File mode using the tabs.",
        "Enter your text or select a file to convert.",
        "Click the action button to process, then copy the result.",
      ]}
      faqs={[
        { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for embedding images in HTML/CSS, transmitting data over text-based protocols, and encoding credentials in HTTP headers." },
        { question: "Is Base64 encoding the same as encryption?", answer: "No. Base64 is an encoding scheme, not encryption. It doesn't provide any security — anyone can decode a Base64 string. It's used for data representation, not data protection." },
        { question: "Can I convert images to Base64?", answer: "Yes! Use the File tab to select any file (images, PDFs, etc.) and convert it to a Base64 data URL that you can embed directly in HTML or CSS." },
      ]}
    >
      <Base64Encoder />
    </ToolPageWrapper>
  );
}
