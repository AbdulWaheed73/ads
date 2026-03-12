"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Search } from "lucide-react";

interface CheckItem {
  label: string;
  passed: boolean;
  detail?: string;
}

interface AdsenseResult {
  checks: CheckItem[];
  passCount: number;
  failCount: number;
  overallScore: number;
}

export function AdsenseChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdsenseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkSite = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    let normalizedUrl = url.trim();
    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/adsense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to check website");
      }

      const data: AdsenseResult = await response.json();
      setResult(data);
      toast.success("Check complete!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to check website";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AdSense Readiness Checker
        </CardTitle>
        <CardDescription>
          Check if your website meets the basic requirements for Google AdSense
          approval.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            onKeyDown={(e) => e.key === "Enter" && checkSite()}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
          <Button onClick={checkSite} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Check
          </Button>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Overall Score</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {result.passCount} of {result.passCount + result.failCount}{" "}
                    checks passed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">
                      {result.passCount}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">
                      {result.failCount}
                    </span>
                  </div>
                  <Badge
                    variant={
                      result.overallScore >= 80 ? "default" : "destructive"
                    }
                  >
                    {result.overallScore}%
                  </Badge>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.overallScore >= 80
                      ? "bg-green-600"
                      : result.overallScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${result.overallScore}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Detailed Results</h3>
              <div className="rounded-lg border divide-y">
                {result.checks.map((check, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3"
                  >
                    {check.passed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          check.passed
                            ? "text-foreground"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {check.label}
                      </p>
                      {check.detail && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {check.detail}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={check.passed ? "secondary" : "destructive"}
                      className="shrink-0"
                    >
                      {check.passed ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
