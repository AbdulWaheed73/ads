"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function MetaTagGenerator() {
  const [fields, setFields] = useState({
    title: "",
    description: "",
    url: "",
    imageUrl: "",
    siteName: "",
    twitterHandle: "",
  });

  const updateField = (key: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const generatedHtml = useMemo(() => {
    const lines: string[] = [];

    if (fields.title) {
      lines.push(`<title>${fields.title}</title>`);
    }
    if (fields.description) {
      lines.push(
        `<meta name="description" content="${fields.description}" />`
      );
    }

    // Open Graph tags
    if (fields.title) {
      lines.push(`<meta property="og:title" content="${fields.title}" />`);
    }
    if (fields.description) {
      lines.push(
        `<meta property="og:description" content="${fields.description}" />`
      );
    }
    if (fields.url) {
      lines.push(`<meta property="og:url" content="${fields.url}" />`);
    }
    if (fields.imageUrl) {
      lines.push(`<meta property="og:image" content="${fields.imageUrl}" />`);
    }
    if (fields.siteName) {
      lines.push(
        `<meta property="og:site_name" content="${fields.siteName}" />`
      );
    }
    lines.push(`<meta property="og:type" content="website" />`);

    // Twitter Card tags
    lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (fields.title) {
      lines.push(`<meta name="twitter:title" content="${fields.title}" />`);
    }
    if (fields.description) {
      lines.push(
        `<meta name="twitter:description" content="${fields.description}" />`
      );
    }
    if (fields.imageUrl) {
      lines.push(`<meta name="twitter:image" content="${fields.imageUrl}" />`);
    }
    if (fields.twitterHandle) {
      const handle = fields.twitterHandle.startsWith("@")
        ? fields.twitterHandle
        : `@${fields.twitterHandle}`;
      lines.push(`<meta name="twitter:site" content="${handle}" />`);
      lines.push(`<meta name="twitter:creator" content="${handle}" />`);
    }

    return lines.join("\n");
  }, [fields]);

  const copyToClipboard = async () => {
    if (!generatedHtml) return;
    await navigator.clipboard.writeText(generatedHtml);
    toast.success("Meta tags copied to clipboard");
  };

  const inputFields: { key: keyof typeof fields; label: string; placeholder: string }[] = [
    { key: "title", label: "Page Title", placeholder: "My Awesome Website" },
    {
      key: "description",
      label: "Description",
      placeholder: "A brief description of your page content",
    },
    { key: "url", label: "Page URL", placeholder: "https://example.com" },
    {
      key: "imageUrl",
      label: "Image URL",
      placeholder: "https://example.com/image.jpg",
    },
    { key: "siteName", label: "Site Name", placeholder: "My Website" },
    {
      key: "twitterHandle",
      label: "Twitter Handle",
      placeholder: "@username",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meta Tag Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {inputFields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-sm font-medium">{field.label}</label>
              <Input
                placeholder={field.placeholder}
                value={fields[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Meta Tags</CardTitle>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre-wrap break-all">
              {generatedHtml}
            </code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
