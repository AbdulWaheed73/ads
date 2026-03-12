import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AdSlot } from "@/components/ads/ad-slot";
import { RelatedTools } from "@/components/ads/related-tools";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageWrapperProps {
  name: string;
  slug?: string;
  description: string;
  children: React.ReactNode;
  howToUse: string[];
  faqs: FAQ[];
}

export function ToolPageWrapper({
  name,
  slug,
  description,
  children,
  howToUse,
  faqs,
}: ToolPageWrapperProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${name} — WebToolKit`,
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Tools", href: "/#tools" },
          { label: name },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-3">{name}</h1>
      <p className="text-muted-foreground mb-8 text-lg">{description}</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-12">{children}</div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              {howToUse.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-20 space-y-6">
            <AdSlot format="rectangle" />
            {slug && <RelatedTools currentSlug={slug} />}
          </div>
        </aside>
      </div>
    </div>
  );
}
