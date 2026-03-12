"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Copy, Trash2 } from "lucide-react";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode" | "encodeUri">("encode");

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else if (mode === "decode") {
        setOutput(decodeURIComponent(input));
      } else {
        setOutput(encodeURI(input));
      }
    } catch {
      toast.error("Invalid input for this operation");
    }
  }, [input, mode]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          URL Encoder / Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs
          value={mode}
          onValueChange={(v) => {
            setMode(v as typeof mode);
            setOutput("");
          }}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="encode">Encode Component</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
            <TabsTrigger value="encodeUri">Encode Full URL</TabsTrigger>
          </TabsList>
        </Tabs>

        <Textarea
          placeholder={
            mode === "decode"
              ? "Enter URL-encoded string to decode..."
              : "Enter text or URL to encode..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
        />

        <div className="flex gap-2">
          <Button onClick={process} disabled={!input}>
            {mode === "decode" ? "Decode" : "Encode"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setInput("");
              setOutput("");
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
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
