import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { CharacterCounter } from "@/components/tools/character-counter";

export const metadata: Metadata = {
  title: "Character Counter — Count Characters, Words & Sentences",
  description: "Free online character counter tool. Count characters, words, sentences, paragraphs, and reading time in real-time. Perfect for social media posts and SEO.",
  alternates: { canonical: "/tools/character-counter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Character Counter & Text Analyzer"
      slug="character-counter"
      description="Count characters, words, sentences, paragraphs, and estimate reading time — all in real-time as you type."
      howToUse={[
        "Type or paste your text into the text area below.",
        "View real-time statistics including character count, word count, and more.",
        "Use the stats to optimize content for social media platforms or SEO requirements.",
      ]}
      faqs={[
        { question: "What character limits do social media platforms have?", answer: "Twitter/X allows 280 characters, Instagram captions allow 2,200, and meta descriptions should be 155-160 characters for optimal SEO." },
        { question: "Does this tool count spaces?", answer: "Yes! We show both character count with spaces and without spaces so you can use whichever metric you need." },
        { question: "How is reading time calculated?", answer: "Reading time is estimated based on an average reading speed of 200 words per minute, which is the standard for adult reading." },
      ]}
    >
      <CharacterCounter />
    </ToolPageWrapper>
  );
}
