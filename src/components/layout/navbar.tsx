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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { tools, toolCategories } from "@/lib/tools-data";

const categories = Object.values(toolCategories);

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
            <DropdownMenuContent align="start" className="w-56 max-h-[70vh] overflow-auto">
              {categories.map((cat, ci) => {
                const catTools = tools.filter((t) => cat.slugs.includes(t.slug));
                return (
                  <div key={cat.label}>
                    {ci > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel>{cat.label}</DropdownMenuLabel>
                    {catTools.map((tool) => (
                      <DropdownMenuItem key={tool.slug} render={<Link href={`/tools/${tool.slug}`} />}>
                        <tool.icon className="h-4 w-4 mr-2" />
                        {tool.name}
                      </DropdownMenuItem>
                    ))}
                  </div>
                );
              })}
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
            <SheetContent side="right" className="w-72 overflow-auto">
              <SheetTitle className="text-lg font-bold mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>

                {categories.map((cat) => {
                  const catTools = tools.filter((t) => cat.slugs.includes(t.slug));
                  return (
                    <div key={cat.label}>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2 mb-1">
                        {cat.label}
                      </p>
                      {catTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          onClick={() => setOpen(false)}
                          className="text-sm hover:text-primary transition-colors flex items-center gap-2 py-1"
                        >
                          <tool.icon className="h-4 w-4" />
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  );
                })}

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
