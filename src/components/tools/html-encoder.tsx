"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode2, Copy, Trash2 } from "lucide-react";

function encodeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (ch) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[ch] || ch;
  }).replace(/[^\x00-\x7F]/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

function decodeHtml(str: string): string {
  if (typeof document === "undefined") return str;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

export function HtmlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = useCallback(() => {
    if (!input) {
      toast.error("Please enter some text");
      return;
    }
    try {
      const result = mode === "encode" ? encodeHtml(input) : decodeHtml(input);
      setOutput(result);
    } catch {
      toast.error(`Failed to ${mode} HTML`);
    }
  }, [input, mode]);

  const copyOutput = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  }, [output]);

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5" />
          HTML Encoder / Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(v as "encode" | "decode");
            setOutput("");
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4 mt-4">
            <Textarea
              placeholder="Enter HTML or text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={!input}>
                Encode
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4 mt-4">
            <Textarea
              placeholder="Enter HTML entities to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={!input}>
                Decode
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <Button variant="ghost" size="sm" onClick={copyOutput}>
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
