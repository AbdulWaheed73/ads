"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Binary, Copy, Trash2, Upload } from "lucide-react";

export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [fileOutput, setFileOutput] = useState("");

  const handleEncode = useCallback(() => {
    try {
      const encoded = btoa(
        new TextEncoder()
          .encode(input)
          .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
      );
      setOutput(encoded);
    } catch {
      toast.error("Failed to encode text");
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    try {
      const bytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
    } catch {
      toast.error("Invalid Base64 string");
    }
  }, [input]);

  const handleFileToBase64 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFileOutput(result);
        toast.success(`File converted (${(file.size / 1024).toFixed(1)} KB)`);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const copyOutput = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    },
    []
  );

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setFileOutput("");
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Binary className="h-5 w-5" />
          Base64 Encoder / Decoder
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
            <TabsTrigger value="file">File → Base64</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4 mt-4">
            <Textarea
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleEncode} disabled={!input}>
                Encode
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4 mt-4">
            <Textarea
              placeholder="Enter Base64 string to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleDecode} disabled={!input}>
                Decode
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="file" className="space-y-4 mt-4">
            <label className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to select a file
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileToBase64}
              />
            </label>
          </TabsContent>
        </Tabs>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Result</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyOutput(output)}
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

        {fileOutput && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data URL</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyOutput(fileOutput)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 max-h-[300px] overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                {fileOutput}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
