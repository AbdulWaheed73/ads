import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { JsonFormatter } from "@/components/tools/json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Minify, Validate",
  description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data with syntax highlighting and error detection.",
  alternates: { canonical: "/tools/json-formatter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="JSON Formatter & Validator"
      description="Paste your JSON to instantly format, minify, or validate it with clear syntax highlighting and helpful error messages."
      howToUse={[
        "Paste your raw JSON data into the input area.",
        "Click Format to beautify it with proper indentation, or Minify to compress it into a single line.",
        "If your JSON contains errors, the validator will highlight the exact location and describe the issue.",
      ]}
      faqs={[
        { question: "What is JSON and why does formatting matter?", answer: "JSON (JavaScript Object Notation) is a lightweight data format used for APIs and configuration files. Proper formatting makes it human-readable and easier to debug." },
        { question: "What is the difference between formatting and minifying?", answer: "Formatting adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace to reduce file size, which is useful for production environments." },
        { question: "Can this tool fix invalid JSON?", answer: "This tool validates and highlights errors in your JSON but cannot automatically fix structural issues. It will point you to the exact line and character where the error occurs so you can correct it manually." },
      ]}
    >
      <JsonFormatter />
    </ToolPageWrapper>
  );
}
