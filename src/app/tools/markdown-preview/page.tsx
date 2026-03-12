import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { MarkdownPreview } from "@/components/tools/markdown-preview";

export const metadata: Metadata = {
  title: "Markdown to HTML Preview — Live Markdown Editor Online",
  description: "Free online Markdown to HTML converter with live preview. Write Markdown and see the rendered HTML output in real-time. Copy the generated HTML with one click.",
  alternates: { canonical: "/tools/markdown-preview" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Markdown to HTML Preview"
      slug="markdown-preview"
      description="Write Markdown on the left and see the live HTML preview on the right. Copy the generated HTML with one click."
      howToUse={[
        "Type or paste Markdown content in the editor on the left.",
        "See the rendered preview update in real-time on the right.",
        "Click Copy HTML to copy the generated HTML to your clipboard.",
      ]}
      faqs={[
        { question: "What Markdown features are supported?", answer: "This tool supports headings (h1-h6), bold, italic, links, images, inline code, code blocks, blockquotes, ordered and unordered lists, and horizontal rules — covering the most common Markdown syntax." },
        { question: "Can I use this for blog posts?", answer: "Absolutely! Write your content in Markdown, preview how it looks, and copy the HTML to paste into your CMS or blog platform. It's great for drafting content with proper formatting." },
        { question: "Is this a full Markdown parser?", answer: "This is a lightweight Markdown-to-HTML converter that covers the most widely used syntax. For advanced features like tables, footnotes, or task lists, consider using a full-featured library like marked or remark." },
      ]}
    >
      <MarkdownPreview />
    </ToolPageWrapper>
  );
}
