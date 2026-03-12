"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextCursorInput, Copy, Trash2 } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos",
  "dolores", "quas", "molestias", "excepturi", "obcaecati", "cupiditate",
  "provident", "similique", "mollitia", "animi", "facilis", "natus", "error",
  "expedita", "distinctio", "nam", "libero", "totam", "rem", "aperiam", "eaque",
  "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto",
  "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "voluptatem",
  "quia", "voluptas", "aspernatur", "aut", "odit", "fugit", "consequuntur",
  "magni", "ratione", "sequi", "nesciunt", "neque", "porro", "quisquam",
];

function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  return words.join(" ");
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    const offset = (i * 7) % LOREM_WORDS.length;
    const words: string[] = [];
    for (let j = 0; j < wordCount; j++) {
      words.push(LOREM_WORDS[(offset + j) % LOREM_WORDS.length]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    sentences.push(words.join(" ") + ".");
  }
  return sentences.join(" ");
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = 4 + Math.floor(Math.random() * 4);
    const sentences: string[] = [];
    for (let j = 0; j < sentenceCount; j++) {
      const wordCount = 8 + Math.floor(Math.random() * 12);
      const offset = ((i * 13) + (j * 7)) % LOREM_WORDS.length;
      const words: string[] = [];
      for (let k = 0; k < wordCount; k++) {
        words.push(LOREM_WORDS[(offset + k) % LOREM_WORDS.length]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      sentences.push(words.join(" ") + ".");
    }
    paragraphs.push(sentences.join(" "));
  }
  return paragraphs.join("\n\n");
}

export function LoremGenerator() {
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    if (count < 1) return;
    const clamped = Math.min(count, 100);
    if (mode === "words") setOutput(generateWords(clamped));
    else if (mode === "sentences") setOutput(generateSentences(clamped));
    else setOutput(generateParagraphs(clamped));
  }, [mode, count]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TextCursorInput className="h-5 w-5" />
          Lorem Ipsum Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
            <TabsTrigger value="sentences">Sentences</TabsTrigger>
            <TabsTrigger value="words">Words</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium whitespace-nowrap">Count:</label>
          <Input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-24"
          />
          <Button onClick={generate}>Generate</Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOutput("")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {output.split(/\s+/).length} words
              </span>
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
            <div className="rounded-lg border bg-muted/30 p-4 max-h-[400px] overflow-auto">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {output}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
