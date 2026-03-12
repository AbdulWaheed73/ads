"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("format");

  const processJson = (mode: string) => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Please enter some JSON.");
      return;
    }

    try {
      const parsed = JSON.parse(input);

      switch (mode) {
        case "format":
          setOutput(JSON.stringify(parsed, null, 2));
          break;
        case "minify":
          setOutput(JSON.stringify(parsed));
          break;
        case "validate":
          setOutput("Valid JSON");
          break;
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      if (mode === "validate") {
        setError(`Invalid JSON: ${message}`);
      } else {
        setError(message);
      }
    }
  };

  const handleTabChange = (value: string | number | null) => {
    if (typeof value === "string") {
      setActiveTab(value);
      if (input.trim()) {
        processJson(value);
      }
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input JSON</label>
        <Textarea
          placeholder='{"key": "value"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-48 font-mono text-sm"
        />
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center justify-between gap-2">
          <TabsList>
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="minify">Minify</TabsTrigger>
            <TabsTrigger value="validate">Validate</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => processJson(activeTab)}
            >
              Run
            </Button>
            <Button variant="outline" size="sm" onClick={copyOutput}>
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </div>

        <TabsContent value="format" className="mt-4">
          <Card>
            <CardContent>
              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : output ? (
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Formatted JSON will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minify" className="mt-4">
          <Card>
            <CardContent>
              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : output ? (
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm break-all">
                  {output}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Minified JSON will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validate" className="mt-4">
          <Card>
            <CardContent>
              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : output ? (
                <p className="text-sm text-green-500 font-medium">{output}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Validation result will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
