"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className={cn(buttonVariants())}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
          <Link
            href="/#tools"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
