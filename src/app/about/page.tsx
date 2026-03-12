import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about WebToolKit — our mission to provide free, fast, and private online tools for developers and creators worldwide.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "About" }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">About WebToolKit</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p className="text-lg text-muted-foreground">
          WebToolKit is a collection of free online tools designed for developers, content creators,
          digital marketers, and anyone who needs quick, reliable utilities without the hassle of
          sign-ups or subscriptions.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          We believe that essential web tools should be accessible to everyone. Too many online tools
          hide behind paywalls, require account creation, or compromise your privacy by uploading your
          data to remote servers. WebToolKit takes a different approach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {[
            {
              icon: Zap,
              title: "Speed First",
              desc: "Most tools run entirely in your browser for instant results with zero latency.",
            },
            {
              icon: Shield,
              title: "Privacy Focused",
              desc: "Your data stays on your device. We don't track, store, or share your information.",
            },
            {
              icon: Heart,
              title: "Community Driven",
              desc: "Built by developers, for developers. We listen to feedback and continuously improve.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="pt-6 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
        <p className="text-muted-foreground">
          Our suite of 10 carefully crafted tools covers a wide range of needs:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Text analysis tools for writers and content creators</li>
          <li>SEO utilities for digital marketers and webmasters</li>
          <li>Developer tools for formatting, generating, and validating data</li>
          <li>Security tools for generating strong passwords</li>
          <li>Media tools for compressing images and generating QR codes</li>
          <li>Productivity tools for time zone conversion</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Technology</h2>
        <p className="text-muted-foreground">
          WebToolKit is built with modern web technologies including Next.js, React, Tailwind CSS, and
          shadcn/ui. We prioritize performance, accessibility, and user experience in everything we build.
          Our client-side tools leverage powerful browser APIs like Canvas, Intl, and the Web Crypto API
          to deliver professional-grade functionality without any server dependencies.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have questions, feedback, or tool suggestions? We&apos;d love to hear from you! Visit our{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contact page
          </a>{" "}
          to get in touch with our team.
        </p>
      </div>
    </div>
  );
}
