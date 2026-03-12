import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { WebsiteAnalyzer } from "@/components/tools/website-analyzer";

export const metadata: Metadata = {
  title: "Website Analyzer — Free SEO & Performance Analysis",
  description: "Analyze any website for SEO issues, performance metrics, accessibility, and best practices. Get actionable recommendations to improve your site.",
  alternates: { canonical: "/tools/website-analyzer" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Website Analyzer"
      description="Enter any URL to get a comprehensive analysis of SEO health, performance metrics, accessibility, and actionable improvement recommendations."
      howToUse={[
        "Enter the full URL of the website you want to analyze.",
        "Wait for the analysis to complete — it checks SEO, performance, accessibility, and best practices.",
        "Review the detailed report and follow the prioritized recommendations to improve your site.",
      ]}
      faqs={[
        { question: "What does this tool analyze?", answer: "The Website Analyzer checks meta tags, heading structure, image optimization, mobile responsiveness, page speed indicators, accessibility issues, and common SEO best practices." },
        { question: "How often should I analyze my website?", answer: "It is a good practice to run an analysis after any major content or design changes, and at least once a month to catch issues early. Regular monitoring helps maintain search engine rankings." },
        { question: "Can this tool analyze any website?", answer: "This tool can analyze most publicly accessible websites. Some sites with strict security policies or those behind authentication walls may have limited analysis results." },
      ]}
    >
      <WebsiteAnalyzer />
    </ToolPageWrapper>
  );
}
