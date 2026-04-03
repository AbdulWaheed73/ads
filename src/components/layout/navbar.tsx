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
  DropdownMenuGroup,
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
                  <DropdownMenuGroup key={cat.label}>
                    {ci > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel>{cat.label}</DropdownMenuLabel>
                    {catTools.map((tool) => (
                      <DropdownMenuItem key={tool.slug} render={<Link href={`/tools/${tool.slug}`} />}>
                        <tool.icon className="h-4 w-4 mr-2" />
                        {tool.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
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
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 overflow-auto px-0 pt-6 pb-8">
              <div className="px-6 pb-4 border-b border-border">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </div>
              <nav className="flex flex-col pt-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="mx-4 text-base font-semibold text-foreground hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-primary/5"
                >
                  Home
                </Link>

                {categories.map((cat) => {
                  const catTools = tools.filter((t) => cat.slugs.includes(t.slug));
                  return (
                    <div key={cat.label} className="mt-5">
                      <p className="mx-7 text-[11px] text-primary font-bold uppercase tracking-widest mb-1.5">
                        {cat.label}
                      </p>
                      <div className="flex flex-col">
                        {catTools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            onClick={() => setOpen(false)}
                            className="mx-4 text-[13px] text-foreground/80 hover:text-foreground transition-colors flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-primary/5"
                          >
                            <tool.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="border-t border-border mt-5 pt-4">
                  <p className="mx-7 text-[11px] text-primary font-bold uppercase tracking-widest mb-1.5">
                    More
                  </p>
                  <div className="flex flex-col">
                    <Link
                      href="/blog"
                      onClick={() => setOpen(false)}
                      className="mx-4 text-[13px] text-foreground/80 font-medium hover:text-foreground transition-colors py-2.5 px-3 rounded-lg hover:bg-primary/5"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setOpen(false)}
                      className="mx-4 text-[13px] text-foreground/80 font-medium hover:text-foreground transition-colors py-2.5 px-3 rounded-lg hover:bg-primary/5"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="mx-4 text-[13px] text-foreground/80 font-medium hover:text-foreground transition-colors py-2.5 px-3 rounded-lg hover:bg-primary/5"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
