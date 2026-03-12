import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { UrlEncoder } from "@/components/tools/url-encoder";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Encode and Decode URLs Online",
  description: "Free online URL encoder and decoder. Encode special characters for URLs, decode percent-encoded strings, and encode full URLs instantly.",
  alternates: { canonical: "/tools/url-encoder" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="URL Encoder & Decoder"
      slug="url-encoder"
      description="Encode special characters for use in URLs, decode percent-encoded strings, or encode full URLs — instantly in your browser."
      howToUse={[
        "Choose Encode Component, Decode, or Encode Full URL mode.",
        "Enter the text or URL you want to process.",
        "Click the button to encode or decode, then copy the result.",
      ]}
      faqs={[
        { question: "What is URL encoding?", answer: "URL encoding (percent-encoding) replaces special characters with a % sign followed by their hexadecimal value. For example, a space becomes %20. This ensures URLs are valid and can be transmitted correctly." },
        { question: "What's the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URL but preserves characters like :, /, ?, and #. encodeURIComponent encodes everything except letters, digits, and a few special characters — use it for query parameter values." },
        { question: "When should I URL-encode text?", answer: "URL-encode text when including user input in query strings, form data, or API requests. Any character that isn't a letter, digit, or one of -_.~ should be encoded in URL components." },
      ]}
    >
      <UrlEncoder />
    </ToolPageWrapper>
  );
}
