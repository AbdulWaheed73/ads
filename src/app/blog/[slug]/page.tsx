import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "WebToolKit",
    },
  };

  // Convert markdown-like content to HTML sections
  const contentHtml = post.content
    .split("\n\n")
    .map((paragraph, i) => {
      if (paragraph.startsWith("### ")) {
        return `<h3 class="text-lg font-semibold mt-6 mb-2">${paragraph.slice(4)}</h3>`;
      }
      if (paragraph.startsWith("## ")) {
        return `<h2 class="text-xl font-bold mt-8 mb-3">${paragraph.slice(3)}</h2>`;
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph
          .split("\n")
          .map((line) => `<li>${line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`)
          .join("");
        return `<ul class="list-disc list-inside space-y-1 text-muted-foreground">${items}</ul>`;
      }
      if (/^\d+\. /.test(paragraph)) {
        const items = paragraph
          .split("\n")
          .map((line) => `<li>${line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`)
          .join("");
        return `<ol class="list-decimal list-inside space-y-1 text-muted-foreground">${items}</ol>`;
      }
      // Apply bold and code formatting
      const formatted = paragraph
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>');
      return `<p class="text-muted-foreground leading-relaxed">${formatted}</p>`;
    })
    .join("\n");

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <Separator className="mb-8" />

        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.relatedTool && (
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border">
            <h3 className="font-semibold mb-2">Try the related tool</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Put what you learned into practice with our free tool.
            </p>
            <Link
              href={`/tools/${post.relatedTool}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/80 transition-colors"
            >
              Open Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </article>

      <Separator className="my-8" />

      <Link
        href="/blog"
        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
    </div>
  );
}
