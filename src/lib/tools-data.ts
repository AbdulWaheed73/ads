import {
  ShieldCheck,
  Globe,
  Type,
  FileText,
  Clock,
  QrCode,
  Code,
  Braces,
  Lock,
  ImageDown,
} from "lucide-react";

export interface Tool {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: typeof ShieldCheck;
  type: "client" | "server";
}

export const tools: Tool[] = [
  {
    name: "AdSense Approval Checker",
    slug: "adsense-checker",
    description: "Check if your website meets Google AdSense requirements.",
    longDescription:
      "Analyze your website against Google AdSense approval criteria. Our checker evaluates your site for essential pages, content quality, navigation, mobile responsiveness, and technical requirements to help you get approved on your first submission.",
    icon: ShieldCheck,
    type: "server",
  },
  {
    name: "Website Analyzer",
    slug: "website-analyzer",
    description: "Analyze any website's SEO, performance, and structure.",
    longDescription:
      "Get a comprehensive analysis of any website including meta tags, heading structure, image optimization, page size, response time, SSL status, and mobile readiness. Perfect for quick SEO audits and competitive analysis.",
    icon: Globe,
    type: "server",
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    description: "Count characters, words, sentences, and paragraphs instantly.",
    longDescription:
      "A real-time character counter that tracks characters (with and without spaces), words, sentences, paragraphs, and estimated reading time. Perfect for social media posts, meta descriptions, and content with character limits.",
    icon: Type,
    type: "client",
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    description: "Count words with keyword density and readability analysis.",
    longDescription:
      "Advanced word counter with keyword density analysis, Flesch-Kincaid readability scoring, and detailed text statistics. Ideal for content writers, bloggers, and SEO professionals optimizing their content.",
    icon: FileText,
    type: "client",
  },
  {
    name: "World Time Converter",
    slug: "time-converter",
    description: "Convert time between any world time zones instantly.",
    longDescription:
      "Easily convert time between any world time zones using the built-in Intl API. Perfect for scheduling meetings across time zones, coordinating with remote teams, and planning international events.",
    icon: Clock,
    type: "client",
  },
  {
    name: "QR Code Generator",
    slug: "qr-generator",
    description: "Generate customizable QR codes for any URL or text.",
    longDescription:
      "Create high-quality QR codes for URLs, text, contact information, and more. Customize size, colors, and download as PNG. Perfect for business cards, marketing materials, and digital sharing.",
    icon: QrCode,
    type: "client",
  },
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO-optimized meta tags and Open Graph tags.",
    longDescription:
      "Generate complete HTML meta tags including Open Graph and Twitter Card tags for optimal social media sharing. Preview your tags in real-time and copy the generated code with one click.",
    icon: Code,
    type: "client",
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Format, validate, and minify JSON data instantly.",
    longDescription:
      "A powerful JSON tool that formats, validates, and minifies JSON data with syntax highlighting. Instantly spot errors, beautify messy JSON, and minify for production use.",
    icon: Braces,
    type: "client",
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate strong, secure passwords with custom options.",
    longDescription:
      "Generate cryptographically secure passwords with customizable length, character types, and strength indicators. Create passwords that are virtually uncrackable while being easy to manage.",
    icon: Lock,
    type: "client",
  },
  {
    name: "Image Compressor",
    slug: "image-compressor",
    description: "Compress images without losing quality, right in your browser.",
    longDescription:
      "Compress JPEG, PNG, and WebP images directly in your browser using the Canvas API. No uploads to external servers — your images stay completely private. Adjust quality and see file size savings instantly.",
    icon: ImageDown,
    type: "client",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
