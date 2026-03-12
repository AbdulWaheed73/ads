"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  fleschKincaidReadingEase,
  getReadabilityLabel,
  getReadabilityColor,
} from "@/lib/readability";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;
    const characterCount = text.length;
    const sentenceCount = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphCount = text
      .split(/\n\n+/)
      .filter((p) => p.trim().length > 0).length;

    return { words, wordCount, characterCount, sentenceCount, paragraphCount };
  }, [text]);

  const keywordDensity = useMemo(() => {
    if (stats.wordCount === 0) return [];

    const frequency: Record<string, number> = {};
    for (const word of stats.words) {
      const lower = word.toLowerCase().replace(/[^a-z0-9'-]/g, "");
      if (lower.length < 2) continue;
      frequency[lower] = (frequency[lower] || 0) + 1;
    }

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / stats.wordCount) * 100).toFixed(1),
      }));
  }, [stats]);

  const readabilityScore = useMemo(
    () => fleschKincaidReadingEase(text),
    [text]
  );
  const readabilityLabel = getReadabilityLabel(readabilityScore);
  const readabilityColorClass = getReadabilityColor(readabilityScore);

  const statItems = [
    { label: "Words", value: stats.wordCount },
    { label: "Characters", value: stats.characterCount },
    { label: "Sentences", value: stats.sentenceCount },
    { label: "Paragraphs", value: stats.paragraphCount },
  ];

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-48"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statItems.map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Readability Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${readabilityColorClass}`}>
                {readabilityScore}
              </span>
              <Badge variant="secondary">{readabilityLabel}</Badge>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  readabilityScore >= 70
                    ? "bg-green-500"
                    : readabilityScore >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${readabilityScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Flesch-Kincaid Reading Ease (0-100). Higher scores indicate easier
              readability.
            </p>
          </div>
        </CardContent>
      </Card>

      {keywordDensity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Density</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">Keyword</th>
                    <th className="pb-2 font-medium text-right">Count</th>
                    <th className="pb-2 font-medium text-right">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordDensity.map((item) => (
                    <tr key={item.word} className="border-b last:border-0">
                      <td className="py-2">{item.word}</td>
                      <td className="py-2 text-right">{item.count}</td>
                      <td className="py-2 text-right">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
