import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { HtmlEncoder } from "@/components/tools/html-encoder";

export const metadata: Metadata = {
  title: "HTML Entity Encoder/Decoder — Encode & Decode HTML Entities",
  description:
    "Encode special characters into HTML entities or decode entities back to plain text. Prevent XSS vulnerabilities and fix garbled markup instantly.",
  alternates: { canonical: "/tools/html-encoder" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="HTML Entity Encoder/Decoder"
      slug="html-encoder"
      description="Encode special characters like angle brackets, ampersands, and quotes into their corresponding HTML entities, or decode entity-encoded text back into readable characters. This tool is essential for safely embedding user-supplied content in HTML, debugging garbled markup, and preventing cross-site scripting vulnerabilities in web applications."
      howToUse={[
        "Paste or type your text into the input area — raw HTML to encode or entity-encoded text to decode.",
        "Click the Encode or Decode button to transform the text in the chosen direction.",
        "Copy the output to your clipboard and paste it into your source code or CMS.",
      ]}
      faqs={[
        {
          question: "What are HTML entities?",
          answer:
            "HTML entities are special sequences that represent reserved or invisible characters in HTML. They start with an ampersand and end with a semicolon, such as &amp; for &, &lt; for <, and &gt; for >. Using entities ensures that browsers render the intended character instead of interpreting it as markup.",
        },
        {
          question: "How does encoding help prevent XSS attacks?",
          answer:
            "Cross-site scripting (XSS) attacks occur when an attacker injects malicious scripts into a web page viewed by other users. By encoding user input — converting characters like < and > into &lt; and &gt; — the browser treats the content as plain text rather than executable HTML or JavaScript, neutralizing the attack vector.",
        },
        {
          question: "What is the difference between named and numeric character references?",
          answer:
            "Named references use a human-readable label like &copy; for the copyright symbol, while numeric references use the Unicode code point in decimal (&#169;) or hexadecimal (&#xA9;) form. Numeric references can represent any Unicode character, whereas named references only exist for a defined subset. Both are decoded identically by browsers.",
        },
      ]}
    >
      <HtmlEncoder />
    </ToolPageWrapper>
  );
}
