"use client";

import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Regex } from "lucide-react";

interface MatchDetail {
  index: number;
  match: string;
  groups: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);
  const [flagU, setFlagU] = useState(false);
  const [error, setError] = useState("");

  const flags = useMemo(() => {
    let f = "";
    if (flagG) f += "g";
    if (flagI) f += "i";
    if (flagM) f += "m";
    if (flagS) f += "s";
    if (flagU) f += "u";
    return f;
  }, [flagG, flagI, flagM, flagS, flagU]);

  const { matches, regex } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchDetail[], regex: null };
    }

    try {
      const re = new RegExp(pattern, flags);
      setError("");
      const results: MatchDetail[] = [];

      if (flags.includes("g")) {
        let m: RegExpExecArray | null;
        let safety = 0;
        while ((m = re.exec(testString)) !== null && safety < 10000) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1),
          });
          if (m[0].length === 0) re.lastIndex++;
          safety++;
        }
      } else {
        const m = re.exec(testString);
        if (m) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1),
          });
        }
      }

      return { matches: results, regex: re };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid regex";
      setError(msg);
      return { matches: [] as MatchDetail[], regex: null };
    }
  }, [pattern, testString, flags]);

  const highlightedText = useMemo(() => {
    if (!regex || !testString || matches.length === 0) {
      return null;
    }

    const parts: { text: string; highlighted: boolean }[] = [];
    let lastIndex = 0;

    for (const m of matches) {
      if (m.index > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, m.index),
          highlighted: false,
        });
      }
      parts.push({ text: m.match, highlighted: true });
      lastIndex = m.index + m.match.length;
    }

    if (lastIndex < testString.length) {
      parts.push({
        text: testString.slice(lastIndex),
        highlighted: false,
      });
    }

    return parts;
  }, [regex, testString, matches]);

  const copyPattern = useCallback(async () => {
    if (!pattern) return;
    const full = `/${pattern}/${flags}`;
    await navigator.clipboard.writeText(full);
    toast.success("Regex copied to clipboard");
  }, [pattern, flags]);

  const clearAll = useCallback(() => {
    setPattern("");
    setTestString("");
    setError("");
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Regex className="h-5 w-5" />
          Regex Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Regular Expression</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-mono">/</span>
            <Input
              placeholder="Enter regex pattern..."
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="font-mono"
            />
            <span className="text-muted-foreground font-mono">
              /{flags}
            </span>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Flags</label>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Global (g)", value: flagG, set: setFlagG },
              { label: "Case Insensitive (i)", value: flagI, set: setFlagI },
              { label: "Multiline (m)", value: flagM, set: setFlagM },
              { label: "Dotall (s)", value: flagS, set: setFlagS },
              { label: "Unicode (u)", value: flagU, set: setFlagU },
            ].map((flag) => (
              <div key={flag.label} className="flex items-center gap-2">
                <Switch
                  checked={flag.value}
                  onCheckedChange={flag.set}
                />
                <span className="text-sm">{flag.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Test String</label>
          <Textarea
            placeholder="Enter text to test against..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="min-h-32 font-mono text-sm"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={copyPattern} variant="outline" className="flex-1">
            Copy Regex
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear
          </Button>
        </div>

        {testString && pattern && !error && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">
                {matches.length} match{matches.length !== 1 ? "es" : ""}
              </Badge>
            </div>

            {highlightedText && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Highlighted Matches
                </label>
                <div className="rounded-lg border p-4 bg-muted/30 font-mono text-sm whitespace-pre-wrap break-all">
                  {highlightedText.map((part, idx) =>
                    part.highlighted ? (
                      <mark
                        key={idx}
                        className="bg-yellow-300 dark:bg-yellow-600 text-foreground rounded px-0.5"
                      >
                        {part.text}
                      </mark>
                    ) : (
                      <span key={idx}>{part.text}</span>
                    )
                  )}
                </div>
              </div>
            )}

            {matches.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Match Details</label>
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-2 font-medium">#</th>
                          <th className="text-left p-2 font-medium">Match</th>
                          <th className="text-left p-2 font-medium">Index</th>
                          <th className="text-left p-2 font-medium">Groups</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((m, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="p-2 text-muted-foreground">
                              {idx + 1}
                            </td>
                            <td className="p-2 font-mono">
                              <Badge variant="secondary">{m.match}</Badge>
                            </td>
                            <td className="p-2 text-muted-foreground">
                              {m.index}
                            </td>
                            <td className="p-2">
                              {m.groups.length > 0 ? (
                                <div className="flex gap-1 flex-wrap">
                                  {m.groups.map((g, gi) => (
                                    <Badge key={gi} variant="outline">
                                      ${gi + 1}: {g ?? "undefined"}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">
                                  None
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
