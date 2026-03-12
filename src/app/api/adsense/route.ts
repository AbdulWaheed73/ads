import { NextRequest, NextResponse } from "next/server";

interface CheckResult {
  name: string;
  passed: boolean;
  details: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let baseUrl = url.trim();
    if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
      baseUrl = "https://" + baseUrl;
    }

    // Remove trailing slash for consistency
    baseUrl = baseUrl.replace(/\/$/, "");

    const fetchOptions = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; WebToolKit/1.0; +https://webtoolkit.dev)",
      },
      redirect: "follow" as RequestRedirect,
      signal: AbortSignal.timeout(15000),
    };

    // Fetch main page
    const mainResponse = await fetch(baseUrl, fetchOptions);
    const mainHtml = await mainResponse.text();

    const checks: CheckResult[] = [];

    // 1. Privacy Policy
    const hasPrivacyPolicy =
      /privacy[- ]?policy/i.test(mainHtml) ||
      mainHtml.includes("/privacy") ||
      mainHtml.includes("/privacy-policy");
    checks.push({
      name: "Privacy Policy",
      passed: hasPrivacyPolicy,
      details: hasPrivacyPolicy
        ? "Privacy policy link found"
        : "No privacy policy link detected",
    });

    // 2. About Page
    const hasAbout =
      /about\s*(us)?/i.test(mainHtml) && mainHtml.includes("/about");
    checks.push({
      name: "About Page",
      passed: hasAbout,
      details: hasAbout
        ? "About page link found"
        : "No about page link detected",
    });

    // 3. Contact Page
    const hasContact =
      /contact(\s*us)?/i.test(mainHtml) && mainHtml.includes("/contact");
    checks.push({
      name: "Contact Page",
      passed: hasContact,
      details: hasContact
        ? "Contact page link found"
        : "No contact page link detected",
    });

    // 4. Content Length
    const textContent = mainHtml
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = textContent.split(/\s+/).length;
    const hasEnoughContent = wordCount > 300;
    checks.push({
      name: "Content Length",
      passed: hasEnoughContent,
      details: `${wordCount} words found (minimum recommended: 300)`,
    });

    // 5. Navigation Links
    const navLinks = (mainHtml.match(/<a[^>]*href=/gi) || []).length;
    const hasNavigation = navLinks >= 5;
    checks.push({
      name: "Navigation Links",
      passed: hasNavigation,
      details: `${navLinks} links found (minimum recommended: 5)`,
    });

    // 6. Mobile Viewport
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(mainHtml);
    checks.push({
      name: "Mobile Viewport",
      passed: hasViewport,
      details: hasViewport
        ? "Viewport meta tag found"
        : "No viewport meta tag detected",
    });

    // 7. Sitemap
    let hasSitemap = false;
    try {
      const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`, fetchOptions);
      hasSitemap = sitemapRes.ok && (await sitemapRes.text()).includes("<url");
    } catch {}
    checks.push({
      name: "Sitemap",
      passed: hasSitemap,
      details: hasSitemap
        ? "sitemap.xml found and valid"
        : "No valid sitemap.xml found",
    });

    // 8. Robots.txt
    let hasRobots = false;
    try {
      const robotsRes = await fetch(`${baseUrl}/robots.txt`, fetchOptions);
      hasRobots =
        robotsRes.ok && (await robotsRes.text()).toLowerCase().includes("user-agent");
    } catch {}
    checks.push({
      name: "Robots.txt",
      passed: hasRobots,
      details: hasRobots
        ? "robots.txt found and valid"
        : "No valid robots.txt found",
    });

    // 9. SSL
    const hasSSL = baseUrl.startsWith("https://");
    checks.push({
      name: "SSL Certificate",
      passed: hasSSL,
      details: hasSSL
        ? "Site uses HTTPS"
        : "Site does not use HTTPS",
    });

    // 10. Meta Description
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(mainHtml);
    checks.push({
      name: "Meta Description",
      passed: hasMetaDesc,
      details: hasMetaDesc
        ? "Meta description found"
        : "No meta description detected",
    });

    const passed = checks.filter((c) => c.passed).length;
    const total = checks.length;

    return NextResponse.json({
      url: baseUrl,
      checks,
      score: {
        passed,
        total,
        percentage: Math.round((passed / total) * 100),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to check website";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
