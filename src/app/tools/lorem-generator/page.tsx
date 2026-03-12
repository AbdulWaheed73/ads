import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { LoremGenerator } from "@/components/tools/lorem-generator";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Generate Placeholder Text Online",
  description: "Free online Lorem Ipsum generator. Generate paragraphs, sentences, or words of placeholder text for your designs, mockups, and prototypes.",
  alternates: { canonical: "/tools/lorem-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Lorem Ipsum Generator"
      slug="lorem-generator"
      description="Generate customizable Lorem Ipsum placeholder text — choose paragraphs, sentences, or words and set the count."
      howToUse={[
        "Select the output type: Paragraphs, Sentences, or Words.",
        "Set the count (1-100) and click Generate.",
        "Copy the generated text with one click.",
      ]}
      faqs={[
        { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is placeholder text commonly used in design and typesetting since the 1500s. It originates from a work by Cicero written in 45 BC. Designers use it to fill layouts before final content is available." },
        { question: "Why use placeholder text instead of real content?", answer: "Placeholder text lets designers focus on layout, typography, and visual design without being distracted by readable content. It simulates the look and feel of real text while making it clear the content is temporary." },
        { question: "How much Lorem Ipsum should I generate?", answer: "It depends on your design. For a typical paragraph, 4-6 sentences work well. For a full page layout, 3-5 paragraphs usually suffice. Match the amount to the expected real content length for the most accurate preview." },
      ]}
    >
      <LoremGenerator />
    </ToolPageWrapper>
  );
}
