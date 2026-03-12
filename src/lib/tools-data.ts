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
  Binary,
  Link2,
  CaseSensitive,
  Fingerprint,
  Palette,
  TextCursorInput,
  FileCode,
} from "lucide-react";

export interface Tool {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: typeof ShieldCheck;
  type: "client" | "server";
  category: "seo" | "text" | "developer" | "utility";
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
    category: "seo",
  },
  {
    name: "Website Analyzer",
    slug: "website-analyzer",
    description: "Analyze any website's SEO, performance, and structure.",
    longDescription:
      "Get a comprehensive analysis of any website including meta tags, heading structure, image optimization, page size, response time, SSL status, and mobile readiness. Perfect for quick SEO audits and competitive analysis.",
    icon: Globe,
    type: "server",
    category: "seo",
  },
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO-optimized meta tags and Open Graph tags.",
    longDescription:
      "Generate complete HTML meta tags including Open Graph and Twitter Card tags for optimal social media sharing. Preview your tags in real-time and copy the generated code with one click.",
    icon: Code,
    type: "client",
    category: "seo",
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    description: "Count characters, words, sentences, and paragraphs instantly.",
    longDescription:
      "A real-time character counter that tracks characters (with and without spaces), words, sentences, paragraphs, and estimated reading time. Perfect for social media posts, meta descriptions, and content with character limits.",
    icon: Type,
    type: "client",
    category: "text",
  },
  {
    name: "Word Counter",
    slug: "word-counter",
    description: "Count words with keyword density and readability analysis.",
    longDescription:
      "Advanced word counter with keyword density analysis, Flesch-Kincaid readability scoring, and detailed text statistics. Ideal for content writers, bloggers, and SEO professionals optimizing their content.",
    icon: FileText,
    type: "client",
    category: "text",
  },
  {
    name: "Text Case Converter",
    slug: "case-converter",
    description: "Convert text to UPPER, lower, Title, camelCase, and more.",
    longDescription:
      "Instantly convert text between UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case. Perfect for programmers and writers.",
    icon: CaseSensitive,
    type: "client",
    category: "text",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-generator",
    description: "Generate customizable Lorem Ipsum placeholder text.",
    longDescription:
      "Generate paragraphs, sentences, or words of Lorem Ipsum placeholder text for your designs, mockups, and prototypes. Configure the output type and count to get exactly the amount of text you need.",
    icon: TextCursorInput,
    type: "client",
    category: "text",
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Format, validate, and minify JSON data instantly.",
    longDescription:
      "A powerful JSON tool that formats, validates, and minifies JSON data with syntax highlighting. Instantly spot errors, beautify messy JSON, and minify for production use.",
    icon: Braces,
    type: "client",
    category: "developer",
  },
  {
    name: "Base64 Encoder/Decoder",
    slug: "base64-encoder",
    description: "Encode text to Base64, decode Base64, or convert files.",
    longDescription:
      "Encode text to Base64, decode Base64 strings back to text, or convert any file to a Base64 data URL. All processing happens in your browser — your data never leaves your device.",
    icon: Binary,
    type: "client",
    category: "developer",
  },
  {
    name: "URL Encoder/Decoder",
    slug: "url-encoder",
    description: "Encode and decode URLs and query parameters instantly.",
    longDescription:
      "Encode special characters for safe use in URLs using encodeURIComponent, decode percent-encoded strings, or encode full URLs with encodeURI. Essential for web development and API work.",
    icon: Link2,
    type: "client",
    category: "developer",
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes.",
    longDescription:
      "Generate cryptographic hashes of any text using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. Uses the Web Crypto API for SHA hashes and a client-side implementation for MD5.",
    icon: Fingerprint,
    type: "client",
    category: "developer",
  },
  {
    name: "Markdown Preview",
    slug: "markdown-preview",
    description: "Write Markdown and preview live HTML output.",
    longDescription:
      "A live Markdown-to-HTML editor with real-time preview. Write or paste Markdown content and instantly see the rendered output. Copy the generated HTML with one click.",
    icon: FileCode,
    type: "client",
    category: "developer",
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, and HSL with WCAG checking.",
    longDescription:
      "Convert colors between HEX, RGB, and HSL formats. Check WCAG contrast ratios for accessibility compliance and generate harmonious color palettes from any color.",
    icon: Palette,
    type: "client",
    category: "developer",
  },
  {
    name: "QR Code Generator",
    slug: "qr-generator",
    description: "Generate customizable QR codes for any URL or text.",
    longDescription:
      "Create high-quality QR codes for URLs, text, contact information, and more. Customize size, colors, and download as PNG. Perfect for business cards, marketing materials, and digital sharing.",
    icon: QrCode,
    type: "client",
    category: "utility",
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    description: "Generate strong, secure passwords with custom options.",
    longDescription:
      "Generate cryptographically secure passwords with customizable length, character types, and strength indicators. Create passwords that are virtually uncrackable while being easy to manage.",
    icon: Lock,
    type: "client",
    category: "utility",
  },
  {
    name: "Image Compressor",
    slug: "image-compressor",
    description: "Compress images without losing quality, right in your browser.",
    longDescription:
      "Compress JPEG, PNG, WebP, GIF, BMP, AVIF, and more directly in your browser using the Canvas API. No uploads to external servers — your images stay completely private. Adjust quality and see file size savings instantly.",
    icon: ImageDown,
    type: "client",
    category: "utility",
  },
  {
    name: "World Time Converter",
    slug: "time-converter",
    description: "Convert time between any world time zones instantly.",
    longDescription:
      "Easily convert time between any world time zones using the built-in Intl API. Perfect for scheduling meetings across time zones, coordinating with remote teams, and planning international events.",
    icon: Clock,
    type: "client",
    category: "utility",
  },
];

export const toolCategories = {
  seo: { label: "SEO & Web", slugs: ["adsense-checker", "website-analyzer", "meta-tag-generator"] },
  text: { label: "Text Tools", slugs: ["character-counter", "word-counter", "case-converter", "lorem-generator"] },
  developer: { label: "Developer Tools", slugs: ["json-formatter", "base64-encoder", "url-encoder", "hash-generator", "markdown-preview", "color-converter"] },
  utility: { label: "Utilities", slugs: ["qr-generator", "password-generator", "image-compressor", "time-converter"] },
};

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
