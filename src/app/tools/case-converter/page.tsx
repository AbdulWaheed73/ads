import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { CaseConverter } from "@/components/tools/case-converter";

export const metadata: Metadata = {
  title: "Text Case Converter — UPPER, lower, Title, camelCase & More",
  description: "Free online text case converter. Convert text to UPPER CASE, lower case, Title Case, camelCase, PascalCase, snake_case, kebab-case, and more.",
  alternates: { canonical: "/tools/case-converter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Text Case Converter"
      slug="case-converter"
      description="Instantly convert text between UPPER CASE, lower case, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more."
      howToUse={[
        "Paste or type your text in the input area.",
        "Click any case conversion button to transform your text.",
        "Copy the result with one click.",
      ]}
      faqs={[
        { question: "What text cases are supported?", answer: "We support UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case — covering all common programming and writing conventions." },
        { question: "What is camelCase vs PascalCase?", answer: "camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., myVariableName). PascalCase capitalizes every word including the first (e.g., MyClassName). camelCase is common for variables and functions, PascalCase for classes and components." },
        { question: "When would I use snake_case or kebab-case?", answer: "snake_case is common in Python, Ruby, and database column names. kebab-case is used in URLs, CSS class names, and HTML attributes. Both separate words with a delimiter instead of capitalization." },
      ]}
    >
      <CaseConverter />
    </ToolPageWrapper>
  );
}
