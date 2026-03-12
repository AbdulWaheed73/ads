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
import {
  Globe,
  Loader2,
  Search,
  ShieldCheck,
  ShieldAlert,
  Heading,
  ImageIcon,
  FileText,
  Clock,
  Smartphone,
} from "lucide-react";

interface AnalysisResult {
  url: string;
  statusCode: number;
  responseTime: number;
  pageSize: number;
  pageSizeFormatted: string;
  ssl: boolean;
  meta: {
    title: string | null;
    description: string | null;
    viewport: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    canonical: string | null;
  };
  headings: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number };
  images: {
    total: number;
    withoutAlt: number;
  };
  links: {
    total: number;
  };
}

export function WebsiteAnalyzer() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
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
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to analyze website");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Analysis complete!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to analyze website";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalHeadings = result
    ? Object.values(result.headings).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Website Analyzer
        </CardTitle>
        <CardDescription>
          Analyze any website for SEO metadata, page structure, and performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
          <Button onClick={analyze} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Analyze
          </Button>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Meta Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Meta Information
              </h3>
              <div className="space-y-2 rounded-lg border p-4">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Title
                  </span>
                  <p className="text-sm font-medium mt-0.5">
                    {result.meta.title || "No title found"}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Description
                  </span>
                  <p className="text-sm mt-0.5">
                    {result.meta.description || "No description found"}
                  </p>
                </div>
                {result.meta.canonical && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      Canonical URL
                    </span>
                    <p className="text-sm mt-0.5 break-all">
                      {result.meta.canonical}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Page Structure */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Heading className="h-4 w-4" />
                Page Structure
              </h3>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">Total Headings:</span>
                  <Badge variant="secondary">{totalHeadings}</Badge>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(
                    Object.entries(result.headings) as [string, number][]
                  ).map(([tag, count]) => (
                    <div
                      key={tag}
                      className="text-center rounded-md bg-muted/50 p-2"
                    >
                      <span className="text-xs text-muted-foreground uppercase">
                        {tag}
                      </span>
                      <p className="text-lg font-semibold">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </h3>
              <div className="rounded-lg border p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Total Images:</span>
                    <Badge variant="secondary">{result.images.total}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Without Alt:</span>
                    <Badge
                      variant={
                        result.images.withoutAlt > 0
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {result.images.withoutAlt}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance & Security */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Performance &amp; Security
              </h3>
              <div className="rounded-lg border p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Page Size</span>
                    <Badge variant="secondary">{result.pageSizeFormatted}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <Badge variant="secondary">{result.responseTime}ms</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <div className="flex items-center gap-1.5">
                      {result.ssl ? (
                        <>
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">Secure</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-500">
                            Not Secure
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-1.5">
                      <Smartphone className="h-4 w-4" />
                      Viewport Meta
                    </span>
                    <Badge
                      variant={result.meta.viewport ? "default" : "destructive"}
                    >
                      {result.meta.viewport ? "Present" : "Missing"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
