"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Copy, Trash2 } from "lucide-react";

const DEFAULT_MD = `# Hello World

This is a **Markdown** preview tool. Type or paste markdown on the left and see the HTML output on the right.

## Features

- **Bold** and *italic* text
- [Links](https://example.com)
- Inline \`code\` and code blocks
- Lists (ordered and unordered)
- Headings (h1-h6)
- Blockquotes
- Horizontal rules

### Code Block

\`\`\`
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote with **bold** text.

---

1. First item
2. Second item
3. Third item
`;

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, _lang, code) =>
    `<pre class="bg-muted rounded-md p-4 overflow-auto my-3"><code class="text-sm font-mono">${code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim()}</code></pre>`
  );

  // Escape HTML inside inline code first, then process
  html = html.replace(/`([^`]+)`/g, (_, code) =>
    `<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">${code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code>`
  );

  // Headings
  html = html.replace(/^###### (.*$)/gm, '<h6 class="text-sm font-semibold mt-4 mb-1">$1</h6>');
  html = html.replace(/^##### (.*$)/gm, '<h5 class="text-sm font-bold mt-4 mb-1">$1</h5>');
  html = html.replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold mt-5 mb-2">$1</h4>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-4 border-muted-foreground/20" />');

  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 my-3 text-muted-foreground italic">$1</blockquote>');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded my-2" />');

  // Unordered lists
  html = html.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>');

  // Wrap consecutive <li> tags
  html = html.replace(/((?:<li class="ml-4 list-disc">.*<\/li>\n?)+)/g, '<ul class="my-2 space-y-1">$1</ul>');
  html = html.replace(/((?:<li class="ml-4 list-decimal">.*<\/li>\n?)+)/g, '<ol class="my-2 space-y-1">$1</ol>');

  // Paragraphs — wrap lines that aren't already HTML
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-muted-foreground leading-relaxed my-2">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

export function MarkdownPreview() {
  const [input, setInput] = useState(DEFAULT_MD);

  const html = useMemo(() => markdownToHtml(input), [input]);
  const rawHtml = useMemo(() => markdownToHtml(input), [input]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Markdown to HTML Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Markdown</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInput("");
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Type markdown here..."
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Preview</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(rawHtml);
                  toast.success("HTML copied to clipboard!");
                }}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy HTML
              </Button>
            </div>
            <div
              className="min-h-[400px] rounded-lg border bg-muted/30 p-4 overflow-auto prose-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
