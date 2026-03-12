"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseSensitive, Copy, Trash2 } from "lucide-react";

const conversions = [
  { label: "UPPER CASE", fn: (s: string) => s.toUpperCase() },
  { label: "lower case", fn: (s: string) => s.toLowerCase() },
  {
    label: "Title Case",
    fn: (s: string) =>
      s.replace(
        /\w\S*/g,
        (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
      ),
  },
  {
    label: "Sentence case",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: "camelCase",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    },
  },
  {
    label: "PascalCase",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    },
  },
  {
    label: "snake_case",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toLowerCase()).join("_");
    },
  },
  {
    label: "kebab-case",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toLowerCase()).join("-");
    },
  },
  {
    label: "CONSTANT_CASE",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toUpperCase()).join("_");
    },
  },
  {
    label: "dot.case",
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || [];
      return words.map((w) => w.toLowerCase()).join(".");
    },
  },
];

export function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState("");

  const convert = useCallback(
    (label: string, fn: (s: string) => string) => {
      if (!input) return;
      setOutput(fn(input));
      setActiveCase(label);
    },
    [input]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CaseSensitive className="h-5 w-5" />
          Text Case Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] text-sm"
        />

        <div className="flex flex-wrap gap-2">
          {conversions.map((c) => (
            <Button
              key={c.label}
              variant={activeCase === c.label ? "default" : "outline"}
              size="sm"
              onClick={() => convert(c.label, c.fn)}
              disabled={!input}
            >
              {c.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("");
              setOutput("");
              setActiveCase("");
            }}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{activeCase}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard!");
                }}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 max-h-[300px] overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                {output}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
