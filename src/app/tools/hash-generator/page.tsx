import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { HashGenerator } from "@/components/tools/hash-generator";

export const metadata: Metadata = {
  title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online",
  description: "Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly using the Web Crypto API. No data leaves your browser.",
  alternates: { canonical: "/tools/hash-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Hash Generator"
      slug="hash-generator"
      description="Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes of any text instantly in your browser using the Web Crypto API."
      howToUse={[
        "Enter or paste the text you want to hash.",
        "Click Generate Hashes to compute all hash algorithms at once.",
        "Copy any individual hash with the copy button next to it.",
      ]}
      faqs={[
        { question: "What is a hash function?", answer: "A hash function takes an input and produces a fixed-size string of characters. The same input always produces the same hash, but even a tiny change in input produces a completely different hash. Hashes are one-way — you can't reverse them to get the original input." },
        { question: "Which hash algorithm should I use?", answer: "SHA-256 is the most widely recommended for general use. SHA-1 and MD5 are considered cryptographically weak and should not be used for security purposes, but they're still useful for checksums and non-security applications." },
        { question: "Is my data sent to a server?", answer: "No. All hashing is done entirely in your browser using the Web Crypto API (for SHA algorithms) and a client-side MD5 implementation. Your data never leaves your device." },
      ]}
    >
      <HashGenerator />
    </ToolPageWrapper>
  );
}
