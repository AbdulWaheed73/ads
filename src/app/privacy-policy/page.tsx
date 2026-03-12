import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WebToolKit privacy policy — how we handle your data, cookies, and third-party services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to WebToolKit (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy
            and ensuring a safe online experience. This Privacy Policy explains how we collect, use, and
            safeguard your information when you visit our website at webtoolkit.dev (the &quot;Site&quot;).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
          <h3 className="text-lg font-semibold mb-2">Client-Side Tools</h3>
          <p className="text-muted-foreground">
            The majority of our tools operate entirely within your web browser. When you use client-side
            tools such as the Character Counter, Word Counter, Password Generator, JSON Formatter, Meta Tag
            Generator, QR Code Generator, World Time Converter, and Image Compressor, your data is processed
            locally on your device. We do not collect, transmit, or store any data you input into these tools.
          </p>
          <h3 className="text-lg font-semibold mb-2 mt-4">Server-Side Tools</h3>
          <p className="text-muted-foreground">
            Our Website Analyzer and AdSense Approval Checker require server-side processing to fetch and
            analyze external websites. When you use these tools, we temporarily process the URL you provide
            to perform the analysis. We do not store the URLs or analysis results after the request is completed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Cookies and Tracking</h2>
          <p className="text-muted-foreground">
            We use minimal cookies necessary for the functionality of our Site:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>Theme Preference:</strong> We store your light/dark mode preference using a cookie to provide a consistent experience across visits.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Google AdSense</h2>
          <p className="text-muted-foreground">
            We may use Google AdSense to display advertisements on our Site. Google AdSense may use cookies
            and web beacons to serve ads based on your prior visits to our Site or other websites. Google&apos;s
            use of advertising cookies enables it and its partners to serve ads based on your visit to our
            Site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Google Analytics</h2>
          <p className="text-muted-foreground">
            We may use Google Analytics to understand how visitors interact with our Site. Google Analytics
            collects information such as how often users visit the Site, what pages they visit, and what other
            sites they used prior to coming to our Site. We use this information solely to improve our Site.
            Google Analytics collects the IP address assigned to you on the date you visit our Site, but we
            do not combine this with other data we may have.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect the security of any
            information we process. Our Site uses HTTPS encryption to ensure data transmitted between your
            browser and our servers is secure. However, no method of electronic transmission or storage is
            100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Third-Party Links</h2>
          <p className="text-muted-foreground">
            Our Site may contain links to third-party websites. We are not responsible for the privacy
            practices or content of these external sites. We encourage you to review the privacy policies
            of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Our Site is not directed to children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you believe we have inadvertently collected such
            information, please contact us so we can promptly remove it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
          <p className="text-muted-foreground">
            Depending on your location, you may have rights regarding your personal data, including the right
            to access, correct, delete, or port your data. Since we collect minimal data, most of these
            rights are automatically satisfied. If you have any concerns, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to
            review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:contact@webtoolkit.dev" className="text-primary hover:underline">
              contact@webtoolkit.dev
            </a>{" "}
            or visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
