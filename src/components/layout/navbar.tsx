"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { tools } from "@/lib/tools-data";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Wrench className="h-6 w-6 text-primary" />
          <span>WebToolKit</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="text-sm font-medium" />}>
              Tools
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {tools.map((tool) => (
                <DropdownMenuItem key={tool.slug} render={<Link href={`/tools/${tool.slug}`} />}>
                  <tool.icon className="h-4 w-4 mr-2" />
                  {tool.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-lg font-bold mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2">
                  Tools
                </p>
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </Link>
                ))}
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2">
                  More
                </p>
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
