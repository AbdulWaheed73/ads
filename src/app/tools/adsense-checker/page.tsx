import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { AdsenseChecker } from "@/components/tools/adsense-checker";

export const metadata: Metadata = {
  title: "AdSense Approval Checker — Is Your Site Ready?",
  description: "Check if your website meets Google AdSense approval requirements. Analyze content quality, policy compliance, and technical readiness before applying.",
  alternates: { canonical: "/tools/adsense-checker" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Google AdSense Approval Checker"
      description="Evaluate your website against Google AdSense approval criteria. Get a detailed checklist of requirements and actionable tips to improve your chances."
      howToUse={[
        "Enter your website URL to begin the AdSense readiness analysis.",
        "Review the checklist covering content quality, site structure, policy compliance, and technical requirements.",
        "Address any flagged issues before submitting your AdSense application to maximize your approval chances.",
      ]}
      faqs={[
        { question: "What are the main requirements for Google AdSense approval?", answer: "Key requirements include having original, high-quality content, a clear site navigation, essential pages (About, Contact, Privacy Policy), sufficient content volume (typically 15-20 quality posts), and compliance with Google's program policies." },
        { question: "How long does AdSense approval take?", answer: "Google typically reviews AdSense applications within 1-14 days, though it can sometimes take longer. Having a well-prepared site with quality content and all required pages can speed up the process." },
        { question: "Can I reapply if my AdSense application is rejected?", answer: "Yes, you can reapply after addressing the issues mentioned in the rejection email. It is recommended to wait at least 2-4 weeks after making improvements before resubmitting your application." },
      ]}
    >
      <AdsenseChecker />
    </ToolPageWrapper>
  );
}
