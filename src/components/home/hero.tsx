"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Free Online Tools for{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Developers & Creators
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          10 powerful, privacy-first tools that run right in your browser. No sign-ups, no ads, no data collection. Just fast, free utilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#tools"
            className={cn(buttonVariants({ size: "lg" }), "text-base")}
          >
            Explore Tools
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base"
            )}
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
