import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "WebToolKit terms of service — usage terms, intellectual property, and limitations of liability.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using WebToolKit (&quot;the Site&quot;), you accept and agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use our Site. We reserve
            the right to modify these terms at any time, and your continued use of the Site constitutes
            acceptance of any modifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Description of Service</h2>
          <p className="text-muted-foreground">
            WebToolKit provides free online tools for developers, content creators, and general users.
            Our tools include text analyzers, code formatters, generators, converters, and website analysis
            utilities. These tools are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Acceptable Use</h2>
          <p className="text-muted-foreground">You agree to use our Site and tools only for lawful purposes. You must not:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Use the tools to process or analyze content that is illegal, harmful, or infringes on others&apos; rights</li>
            <li>Attempt to overload, disrupt, or interfere with the proper functioning of the Site</li>
            <li>Use automated systems (bots, scrapers) to access the Site without our written permission</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Site</li>
            <li>Use our server-side tools (Website Analyzer, AdSense Checker) to scan websites without proper authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content, features, and functionality of the Site — including but not limited to text, graphics,
            logos, icons, and code — are the exclusive property of WebToolKit and are protected by international
            copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or
            create derivative works from our content without express written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">User-Generated Content</h2>
          <p className="text-muted-foreground">
            Any text, code, images, or other content you input into our tools remains your property. We do not
            claim ownership of any content you process using our tools. For client-side tools, your content
            is never transmitted to our servers. For server-side tools, content is processed temporarily and
            not stored after the request is completed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the fullest extent permitted by law, WebToolKit shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
            directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Your use or inability to use the Site or tools</li>
            <li>Any errors, inaccuracies, or omissions in tool outputs</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of transmission to or from the Site</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            The Site and all tools are provided on an &quot;as is&quot; and &quot;as available&quot; basis. WebToolKit makes no
            representations or warranties of any kind, express or implied, regarding the operation of the Site
            or the accuracy, completeness, or reliability of any tool outputs. We do not warrant that the Site
            will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms shall be governed by and construed in accordance with applicable laws, without regard
            to conflict of law principles. Any disputes arising under these Terms shall be resolved in the
            appropriate courts of jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p className="text-muted-foreground">
            For questions about these Terms of Service, contact us at{" "}
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
