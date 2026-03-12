import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webtoolkit.dev"),
  title: {
    default: "WebToolKit — Free Online Tools for Developers & Creators",
    template: "%s | WebToolKit",
  },
  description:
    "Free online tools for developers and creators. Character counter, word counter, JSON formatter, QR code generator, password generator, image compressor, and more. Fast, private, and always free.",
  keywords: [
    "online tools",
    "developer tools",
    "free tools",
    "character counter",
    "word counter",
    "JSON formatter",
    "QR code generator",
    "password generator",
    "image compressor",
    "SEO tools",
    "meta tag generator",
  ],
  authors: [{ name: "WebToolKit" }],
  creator: "WebToolKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webtoolkit.dev",
    siteName: "WebToolKit",
    title: "WebToolKit — Free Online Tools for Developers & Creators",
    description:
      "Free online tools for developers and creators. Fast, private, and always free.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebToolKit — Free Online Tools for Developers & Creators",
    description:
      "Free online tools for developers and creators. Fast, private, and always free.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
