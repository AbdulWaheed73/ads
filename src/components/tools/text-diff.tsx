"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompareArrows } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  lineNumOld?: number;
  lineNumNew?: number;
}

function computeLCSDiff(oldLines: string[], newLines: string[]): DiffLine[] {
  const m = oldLines.length;
  const n = newLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const result: DiffLine[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({
        type: "unchanged",
        text: oldLines[i - 1],
        lineNumOld: i,
        lineNumNew: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: "added",
        text: newLines[j - 1],
        lineNumNew: j,
      });
      j--;
    } else if (i > 0) {
      result.unshift({
        type: "removed",
        text: oldLines[i - 1],
        lineNumOld: i,
      });
      i--;
    }
  }

  return result;
}

export function TextDiff() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const compare = useCallback(() => {
    if (!original && !modified) {
      toast.error("Please enter text in both fields");
      return;
    }

    const oldLines = original.split("\n");
    const newLines = modified.split("\n");
    const result = computeLCSDiff(oldLines, newLines);
    setDiff(result);
    toast.success("Diff computed");
  }, [original, modified]);

  const clearAll = useCallback(() => {
    setOriginal("");
    setModified("");
    setDiff(null);
  }, []);

  const addedCount = diff?.filter((d) => d.type === "added").length ?? 0;
  const removedCount = diff?.filter((d) => d.type === "removed").length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompareArrows className="h-5 w-5" />
          Text Diff
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Original</label>
            <Textarea
              placeholder="Paste original text here..."
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="min-h-48 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Modified</label>
            <Textarea
              placeholder="Paste modified text here..."
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              className="min-h-48 font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={compare} className="flex-1">
            Compare
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear
          </Button>
        </div>

        {diff && (
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default" className="bg-green-600">
                +{addedCount} added
              </Badge>
              <Badge variant="destructive">
                -{removedCount} removed
              </Badge>
              <Badge variant="secondary">
                {diff.filter((d) => d.type === "unchanged").length} unchanged
              </Badge>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <div className="font-mono text-sm">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex px-3 py-0.5 ${
                        line.type === "added"
                          ? "bg-green-500/15 text-green-700 dark:text-green-400"
                          : line.type === "removed"
                          ? "bg-red-500/15 text-red-700 dark:text-red-400"
                          : ""
                      }`}
                    >
                      <span className="w-10 shrink-0 text-muted-foreground text-right pr-2 select-none border-r mr-2">
                        {line.lineNumOld ?? ""}
                      </span>
                      <span className="w-10 shrink-0 text-muted-foreground text-right pr-2 select-none border-r mr-2">
                        {line.lineNumNew ?? ""}
                      </span>
                      <span className="w-4 shrink-0 select-none">
                        {line.type === "added"
                          ? "+"
                          : line.type === "removed"
                          ? "-"
                          : " "}
                      </span>
                      <span className="whitespace-pre-wrap break-all">
                        {line.text || "\u00A0"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
