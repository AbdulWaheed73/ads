import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    const startTime = Date.now();
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WebToolKit/1.0; +https://webtoolkit.dev)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    const responseTime = Date.now() - startTime;

    const html = await response.text();
    const contentLength = new TextEncoder().encode(html).length;

    // Parse meta tags
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDescMatch = html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const viewportMatch = html.match(
      /<meta[^>]*name=["']viewport["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const ogTitleMatch = html.match(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const ogDescMatch = html.match(
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const ogImageMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([\s\S]*?)["']/i
    );
    const canonicalMatch = html.match(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i
    );

    // Count headings
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
    const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
    const h3Count = (html.match(/<h3[\s>]/gi) || []).length;
    const h4Count = (html.match(/<h4[\s>]/gi) || []).length;
    const h5Count = (html.match(/<h5[\s>]/gi) || []).length;
    const h6Count = (html.match(/<h6[\s>]/gi) || []).length;

    // Count images
    const images = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = images.filter(
      (img) => !img.match(/alt=["'][^"']+["']/i)
    ).length;

    // Check SSL
    const isSSL = targetUrl.startsWith("https://");

    // Count links
    const internalLinks = (
      html.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || []
    ).length;

    return NextResponse.json({
      url: targetUrl,
      statusCode: response.status,
      responseTime,
      pageSize: contentLength,
      pageSizeFormatted:
        contentLength > 1024 * 1024
          ? `${(contentLength / (1024 * 1024)).toFixed(2)} MB`
          : `${(contentLength / 1024).toFixed(2)} KB`,
      ssl: isSSL,
      meta: {
        title: titleMatch?.[1]?.trim() || null,
        description: metaDescMatch?.[1]?.trim() || null,
        viewport: viewportMatch?.[1]?.trim() || null,
        ogTitle: ogTitleMatch?.[1]?.trim() || null,
        ogDescription: ogDescMatch?.[1]?.trim() || null,
        ogImage: ogImageMatch?.[1]?.trim() || null,
        canonical: canonicalMatch?.[1]?.trim() || null,
      },
      headings: {
        h1: h1Count,
        h2: h2Count,
        h3: h3Count,
        h4: h4Count,
        h5: h5Count,
        h6: h6Count,
      },
      images: {
        total: images.length,
        withoutAlt: imagesWithoutAlt,
      },
      links: {
        total: internalLinks,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze website";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
