import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { UuidGenerator } from "@/components/tools/uuid-generator";

export const metadata: Metadata = {
  title: "UUID Generator — Generate Random UUIDs Instantly",
  description:
    "Generate random UUID v4 identifiers instantly. Bulk generation, uppercase toggle, and one-click copy. No server — 100% browser-based.",
  alternates: { canonical: "/tools/uuid-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="UUID Generator"
      slug="uuid-generator"
      description="Generate universally unique identifiers (UUIDs) right in your browser. This tool creates cryptographically random version-4 UUIDs that are safe to use as database primary keys, session tokens, correlation IDs, and anywhere else you need a guaranteed-unique string. Generate one or thousands at a time, toggle between uppercase and lowercase, and copy results with a single click."
      howToUse={[
        "Click the Generate button to create a new random UUID v4 identifier.",
        "Adjust the quantity slider or input to bulk-generate multiple UUIDs at once.",
        "Use the copy button to copy all generated UUIDs to your clipboard, ready to paste into your code or database.",
      ]}
      faqs={[
        {
          question: "What format does a UUID v4 follow?",
          answer:
            "A UUID v4 is a 128-bit value displayed as 32 hexadecimal digits separated by hyphens in the pattern 8-4-4-4-12, for example 550e8400-e29b-41d4-a716-446655440000. The version nibble (the 13th hex digit) is always 4, and the variant bits ensure compatibility with the RFC 4122 standard.",
        },
        {
          question: "How unique are UUID v4 values?",
          answer:
            "UUID v4 values are generated using cryptographically secure random numbers, giving 122 bits of randomness. The probability of a collision is astronomically low — you would need to generate about 2.71 quintillion UUIDs before having a 50% chance of a single duplicate. For all practical purposes they can be treated as globally unique.",
        },
        {
          question: "What other UUID versions exist and when should I use them?",
          answer:
            "UUID v1 is time-based and includes the MAC address, which can leak hardware info. UUID v5 and v3 are namespace-based using SHA-1 and MD5 respectively, useful for deterministic IDs. UUID v7 (draft) is time-ordered and ideal for database indexing. Version 4 remains the most popular choice when you simply need a random, unique identifier with no external input.",
        },
      ]}
    >
      <UuidGenerator />
    </ToolPageWrapper>
  );
}
