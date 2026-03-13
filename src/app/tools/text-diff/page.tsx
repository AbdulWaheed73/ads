import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { TextDiff } from "@/components/tools/text-diff";

export const metadata: Metadata = {
  title: "Text Diff — Compare Text Side by Side",
  description:
    "Compare two blocks of text side by side and instantly see additions, deletions, and changes highlighted. Free, private, and browser-based.",
  alternates: { canonical: "/tools/text-diff" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Text Diff"
      slug="text-diff"
      description="Paste two versions of any text and instantly see a clear, color-coded comparison highlighting every addition, deletion, and modification. Whether you are reviewing code changes, comparing configuration files, or checking document revisions, this tool makes differences easy to spot. Everything runs in your browser, so your text is never sent to a server."
      howToUse={[
        "Paste the original text into the left editor and the modified text into the right editor.",
        "Click Compare to generate a side-by-side diff with additions, deletions, and changes highlighted in different colors.",
        "Review the highlighted differences and use the navigation arrows to jump between changes quickly.",
      ]}
      faqs={[
        {
          question: "What algorithm is used to compute the diff?",
          answer:
            "This tool uses a variation of the Myers diff algorithm, which finds the shortest edit script — the minimum number of insertions and deletions needed to transform one text into the other. It is the same foundational algorithm used by Git and other version control systems, providing accurate and efficient results even for large texts.",
        },
        {
          question: "What are common use cases for a text diff tool?",
          answer:
            "Text diff tools are invaluable for comparing code before and after refactoring, reviewing configuration file changes across environments, verifying contract or document revisions, and debugging by comparing expected vs. actual output. They are also useful for educators grading assignments and for writers tracking edits between drafts.",
        },
        {
          question: "Is my text data kept private?",
          answer:
            "Yes, completely. All comparison logic runs locally in your browser using JavaScript. Your text is never transmitted to any server, stored in any database, or logged anywhere. Once you close or refresh the page, the data is gone. This makes the tool safe for comparing sensitive or confidential content.",
        },
      ]}
    >
      <TextDiff />
    </ToolPageWrapper>
  );
}
