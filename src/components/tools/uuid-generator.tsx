"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { KeyRound, Copy } from "lucide-react";

export function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const clamped = Math.max(1, Math.min(100, count));
    const results: string[] = [];
    for (let i = 0; i < clamped; i++) {
      const id = crypto.randomUUID();
      results.push(uppercase ? id.toUpperCase() : id);
    }
    setUuids(results);
    toast.success(`Generated ${clamped} UUID${clamped > 1 ? "s" : ""}`);
  }, [count, uppercase]);

  const copyAll = useCallback(() => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    toast.success("All UUIDs copied to clipboard!");
  }, [uuids]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          UUID Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="space-y-1 flex-1">
            <label className="text-sm font-medium">Count (1–100)</label>
            <Input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Uppercase</label>
            <Switch
              checked={uppercase}
              onCheckedChange={(checked: boolean) => setUppercase(checked)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate}>Generate</Button>
          <Button variant="outline" onClick={copyAll} disabled={uuids.length === 0}>
            <Copy className="h-4 w-4 mr-1" />
            Copy All
          </Button>
        </div>

        {uuids.length > 0 && (
          <div className="rounded-lg border bg-muted/30 p-4 max-h-[400px] overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap break-all">
              {uuids.join("\n")}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
