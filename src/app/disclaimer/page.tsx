import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "WebToolKit disclaimer — tool accuracy, limitations, and no liability notice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Disclaimer</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 1, 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-3">General Disclaimer</h2>
          <p className="text-muted-foreground">
            The information and tools provided on WebToolKit (&quot;the Site&quot;) are for general informational
            and utility purposes only. While we strive to provide accurate and useful tools, we make no
            representations or warranties of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability of the tools or the results they produce.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Tool Accuracy</h2>
          <p className="text-muted-foreground">
            Our tools are designed to provide helpful estimates and analyses, but they should not be
            considered definitive or authoritative. Specifically:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>AdSense Approval Checker:</strong> This tool provides a heuristic-based assessment
              of common AdSense requirements. Passing all checks does not guarantee Google AdSense approval,
              as Google&apos;s review process considers many additional factors.
            </li>
            <li>
              <strong>Website Analyzer:</strong> Analysis results are based on a snapshot of the website at
              the time of analysis. Results may vary based on server response, dynamic content, and other factors.
            </li>
            <li>
              <strong>Readability Scores:</strong> Flesch-Kincaid and other readability metrics are
              statistical estimates and may not perfectly reflect the actual reading difficulty of your content.
            </li>
            <li>
              <strong>Password Generator:</strong> While our password generator uses cryptographically secure
              random number generation, the overall security of a password depends on many factors including
              how it is stored and used.
            </li>
            <li>
              <strong>Image Compressor:</strong> Compression results may vary depending on the input image
              format, content, and browser implementation of the Canvas API.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">No Professional Advice</h2>
          <p className="text-muted-foreground">
            The tools and information on this Site do not constitute professional advice. For specific
            concerns about SEO, website optimization, security, or any other topic, please consult with
            qualified professionals in the relevant field.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">External Links</h2>
          <p className="text-muted-foreground">
            Our Site may contain links to external websites. We do not endorse or take responsibility for
            the content, privacy practices, or accuracy of external websites. Accessing external links is
            at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            In no event shall WebToolKit, its owners, operators, or contributors be liable for any direct,
            indirect, incidental, consequential, or punitive damages arising from your use of, or inability
            to use, the Site or its tools. This includes, without limitation, damages for loss of profits,
            data, goodwill, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Changes to This Disclaimer</h2>
          <p className="text-muted-foreground">
            We reserve the right to update or modify this Disclaimer at any time without prior notice. Your
            continued use of the Site after any changes constitutes acceptance of the updated Disclaimer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Contact</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Disclaimer, please contact us at{" "}
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
