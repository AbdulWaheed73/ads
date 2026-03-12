import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { MetaTagGenerator } from "@/components/tools/meta-tag-generator";

export const metadata: Metadata = {
  title: "Meta Tag Generator — SEO & Open Graph Tags",
  description: "Generate SEO-optimized meta tags, Open Graph tags, and Twitter Card tags for your website. Preview how your page will appear in search results and social media.",
  alternates: { canonical: "/tools/meta-tag-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Meta Tag / SEO Tag Generator"
      description="Generate complete meta tags for SEO, Open Graph, and Twitter Cards. Preview your search result appearance and copy the HTML to your site."
      howToUse={[
        "Fill in your page title, description, URL, and optional image URL in the form fields.",
        "Preview how your page will appear in Google search results and on social media platforms.",
        "Copy the generated HTML meta tags and paste them into the <head> section of your webpage.",
      ]}
      faqs={[
        { question: "What are meta tags and why are they important for SEO?", answer: "Meta tags are HTML elements that provide metadata about your webpage to search engines and social media platforms. They influence how your page appears in search results and when shared on social media, directly impacting click-through rates." },
        { question: "What is the ideal length for a meta title and description?", answer: "Meta titles should be 50-60 characters to avoid truncation in search results. Meta descriptions should be 150-160 characters to display fully on Google." },
        { question: "What are Open Graph tags?", answer: "Open Graph (OG) tags are meta tags that control how your content appears when shared on Facebook, LinkedIn, and other social platforms. They define the title, description, image, and URL shown in the social media preview card." },
      ]}
    >
      <MetaTagGenerator />
    </ToolPageWrapper>
  );
}
