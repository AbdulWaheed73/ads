import { Fragment } from "react";
import { Hero } from "@/components/home/hero";
import { ToolCard } from "@/components/home/tool-card";
import { Features } from "@/components/home/features";
import { AdSlot } from "@/components/ads/ad-slot";
import { tools } from "@/lib/tools-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are all tools really free?",
    answer:
      "Yes! Every tool on WebToolKit is 100% free with no usage limits, no sign-ups, and no hidden costs. We believe useful tools should be accessible to everyone.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. Most of our tools run entirely in your browser — your data never leaves your device. For server-side tools like the Website Analyzer, we only fetch the URL you provide and never store the results.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Just visit any tool and start using it immediately. No sign-ups, no emails, no hassle.",
  },
  {
    question: "What technologies power WebToolKit?",
    answer:
      "WebToolKit is built with Next.js, Tailwind CSS, and shadcn/ui. Client-side tools use browser APIs like Canvas and the Intl API for maximum performance and privacy.",
  },
  {
    question: "Can I suggest a new tool?",
    answer:
      "We'd love to hear your ideas! Visit our Contact page to send us your tool suggestions and we'll consider adding them to the collection.",
  },
];

export default function Home() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />

      {/* Ad slot between hero and tools */}
      <div className="container mx-auto px-4">
        <AdSlot format="horizontal" className="my-6" />
      </div>

      <section id="tools" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            All Tools
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Pick a tool and get started — no sign-up required.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Fragment key={tool.slug}>
                <ToolCard tool={tool} />
                {/* Insert ad after every 6th card */}
                {(index + 1) % 6 === 0 && index < tools.length - 1 && (
                  <div className="col-span-full">
                    <AdSlot format="horizontal" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <Features />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
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
        </div>
      </section>
    </>
  );
}
