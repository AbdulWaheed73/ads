"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush, Copy, Trash2 } from "lucide-react";

function beautifyCss(css: string): string {
  let result = css.trim();
  // Remove extra whitespace
  result = result.replace(/\s+/g, " ");
  // Add newline after {
  result = result.replace(/\{\s*/g, " {\n  ");
  // Add newline after ;
  result = result.replace(/;\s*/g, ";\n  ");
  // Add newline before }
  result = result.replace(/\s*\}/g, "\n}");
  // Add newline after }
  result = result.replace(/\}\s*/g, "}\n\n");
  // Clean up trailing spaces on lines
  result = result.replace(/[ \t]+\n/g, "\n");
  // Remove trailing whitespace
  result = result.trim();
  return result;
}

function minifyCss(css: string): string {
  let result = css.trim();
  // Remove comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove newlines
  result = result.replace(/\n/g, "");
  // Collapse whitespace
  result = result.replace(/\s+/g, " ");
  // Remove spaces around { } : ; ,
  result = result.replace(/\s*\{\s*/g, "{");
  result = result.replace(/\s*\}\s*/g, "}");
  result = result.replace(/\s*:\s*/g, ":");
  result = result.replace(/\s*;\s*/g, ";");
  result = result.replace(/\s*,\s*/g, ",");
  // Remove last semicolon before }
  result = result.replace(/;}/g, "}");
  return result.trim();
}

export function CssFormatter() {
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleFormat = useCallback(() => {
    if (!input) {
      toast.error("Please enter some CSS");
      return;
    }
    try {
      const result = mode === "beautify" ? beautifyCss(input) : minifyCss(input);
      setOutput(result);
      toast.success(mode === "beautify" ? "CSS beautified!" : "CSS minified!");
    } catch {
      toast.error("Failed to format CSS");
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
          <Paintbrush className="h-5 w-5" />
          CSS Formatter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(v as "beautify" | "minify");
            setOutput("");
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="beautify">Beautify</TabsTrigger>
            <TabsTrigger value="minify">Minify</TabsTrigger>
          </TabsList>

          <TabsContent value="beautify" className="space-y-4 mt-4">
            <Textarea
              placeholder="Paste your CSS here to beautify..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[160px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleFormat} disabled={!input}>
                Beautify
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="minify" className="space-y-4 mt-4">
            <Textarea
              placeholder="Paste your CSS here to minify..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[160px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleFormat} disabled={!input}>
                Minify
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
            <div className="rounded-lg border bg-muted/30 p-4 max-h-[400px] overflow-auto">
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
