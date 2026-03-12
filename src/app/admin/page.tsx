"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  BarChart3,
  Gauge,
  Globe,
  FileText,
  Wrench,
  ExternalLink,
  Activity,
  Eye,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { tools } from "@/lib/tools-data";
import { blogPosts } from "@/lib/blog-data";

const ADMIN_PASSWORD = "webtoolkit2025";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Portal</CardTitle>
            <CardDescription>
              Enter the admin password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate total pages: tool pages + blog pages + static pages (home, about, contact, blog index, privacy, terms, disclaimer, admin, sitemap) = 9 + tools + blogs
  const totalPages = 9 + tools.length + blogPosts.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="h-7 w-7 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            WebToolKit analytics and site overview
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAuthenticated(false)}
        >
          Sign Out
        </Button>
      </div>

      {/* Site Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tools", value: tools.length, icon: Wrench, color: "text-blue-500" },
          { label: "Blog Posts", value: blogPosts.length, icon: FileText, color: "text-green-500" },
          { label: "Total Pages", value: totalPages, icon: Globe, color: "text-purple-500" },
          { label: "API Routes", value: 2, icon: Activity, color: "text-orange-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vercel Analytics & Speed Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Vercel Analytics
            </CardTitle>
            <CardDescription>
              Visitor tracking and page view analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-600">Active</Badge>
                <span className="text-sm text-muted-foreground">@vercel/analytics installed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Analytics is collecting data on every page. View detailed visitor metrics,
                page views, top pages, referrers, countries, and devices in your Vercel dashboard.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-2 rounded-md bg-background">
                  <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Page Views</p>
                </div>
                <div className="text-center p-2 rounded-md bg-background">
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Visitors</p>
                </div>
                <div className="text-center p-2 rounded-md bg-background">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Top Pages</p>
                </div>
              </div>
            </div>
            <a
              href="https://vercel.com/dashboard/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open Vercel Analytics Dashboard
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="h-5 w-5 text-primary" />
              Speed Insights
            </CardTitle>
            <CardDescription>
              Real-user performance metrics (Core Web Vitals)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-600">Active</Badge>
                <span className="text-sm text-muted-foreground">@vercel/speed-insights installed</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Speed Insights captures real-user Core Web Vitals. View LCP, FID, CLS, FCP,
                TTFB, and INP metrics broken down by route in your Vercel dashboard.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-2 rounded-md bg-background">
                  <Zap className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">LCP</p>
                </div>
                <div className="text-center p-2 rounded-md bg-background">
                  <Activity className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">FID / INP</p>
                </div>
                <div className="text-center p-2 rounded-md bg-background">
                  <Gauge className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">CLS</p>
                </div>
              </div>
            </div>
            <a
              href="https://vercel.com/dashboard/speed-insights"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open Speed Insights Dashboard
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      {/* Tools Overview */}
      <h2 className="text-xl font-bold mb-4">Tools Overview</h2>
      <div className="rounded-lg border overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Tool</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Type</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Route</th>
              <th className="text-right p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool) => (
              <tr key={tool.slug} className="border-b last:border-0">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <tool.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{tool.name}</span>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell">
                  <Badge variant="secondary" className="text-xs">
                    {tool.type === "client" ? "Client-side" : "Server-side"}
                  </Badge>
                </td>
                <td className="p-3 hidden md:table-cell">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    /tools/{tool.slug}
                  </code>
                </td>
                <td className="p-3 text-right">
                  <Badge variant="default" className="bg-green-600 text-xs">
                    Live
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blog Posts Overview */}
      <h2 className="text-xl font-bold mb-4">Blog Posts</h2>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Title</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Reading Time</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Tags</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.slug} className="border-b last:border-0">
                <td className="p-3">
                  <span className="font-medium">{post.title}</span>
                </td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">
                  {post.readingTime}
                </td>
                <td className="p-3 hidden md:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
