import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { RegexTester } from "@/components/tools/regex-tester";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online",
  description:
    "Test and debug regular expressions in real time with match highlighting, capture groups, and flag toggles. Supports JavaScript regex syntax.",
  alternates: { canonical: "/tools/regex-tester" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Regex Tester"
      slug="regex-tester"
      description="Write and test regular expressions against sample text in real time. Matches are highlighted instantly as you type, with detailed information about capture groups, match indices, and the overall match count. Toggle flags like global, case-insensitive, and multiline with a click. Perfect for building, debugging, and learning regex patterns without leaving your browser."
      howToUse={[
        "Type or paste your regular expression into the pattern field at the top.",
        "Enter or paste the test string you want to match against in the text area below.",
        "View highlighted matches in real time, inspect capture groups, and toggle flags (g, i, m, s) to refine your pattern.",
      ]}
      faqs={[
        {
          question: "What regex syntax does this tool support?",
          answer:
            "This tool uses the JavaScript RegExp engine built into your browser, which supports standard syntax including character classes, quantifiers, lookaheads, lookbehinds (in modern browsers), backreferences, and named capture groups. If you need PCRE or POSIX-specific features not available in JavaScript, the pattern may behave differently here than in other environments.",
        },
        {
          question: "What do the different regex flags do?",
          answer:
            "The global (g) flag finds all matches instead of stopping at the first one. Case-insensitive (i) makes the pattern match regardless of letter case. Multiline (m) changes ^ and $ to match the start and end of each line rather than the entire string. Dotall (s) makes the dot (.) match newline characters as well. Combining flags lets you fine-tune matching behavior.",
        },
        {
          question: "Can a regex cause performance problems?",
          answer:
            "Yes, poorly written patterns can cause catastrophic backtracking, where the engine explores an exponential number of paths before failing. This typically happens with nested quantifiers like (a+)+ or overlapping alternations. To avoid this, keep patterns specific, use atomic groups or possessive quantifiers where available, and test with both matching and non-matching inputs to ensure the pattern completes quickly.",
        },
      ]}
    >
      <RegexTester />
    </ToolPageWrapper>
  );
}
