import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { WordCounter } from "@/components/tools/word-counter";

export const metadata: Metadata = {
  title: "Word Counter with Keyword Density & Readability Score",
  description: "Free word counter with keyword density analysis and Flesch-Kincaid readability scoring. Perfect for SEO content optimization.",
  alternates: { canonical: "/tools/word-counter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Word Counter with Keyword Density & Readability"
      slug="word-counter"
      description="Analyze your text with word count, keyword density percentages, and Flesch-Kincaid readability scores to optimize your content for SEO."
      howToUse={[
        "Paste or type your content into the text area below.",
        "Review the keyword density table to ensure your target keywords appear at an optimal frequency (1-3%).",
        "Check the Flesch-Kincaid readability score — aim for a score of 60-70 for general web content.",
      ]}
      faqs={[
        { question: "What is keyword density and why does it matter?", answer: "Keyword density is the percentage of times a keyword appears relative to the total word count. Maintaining a density of 1-3% helps search engines understand your topic without triggering over-optimization penalties." },
        { question: "What is the Flesch-Kincaid readability score?", answer: "The Flesch-Kincaid score measures how easy your text is to read on a scale of 0-100. Higher scores mean easier reading. A score of 60-70 is considered ideal for general web audiences." },
        { question: "How many words should a blog post be for SEO?", answer: "While there is no magic number, long-form content of 1,500-2,500 words tends to rank well for competitive keywords. However, quality and relevance matter more than length alone." },
      ]}
    >
      <WordCounter />
    </ToolPageWrapper>
  );
}
