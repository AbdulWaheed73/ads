import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { PasswordGenerator } from "@/components/tools/password-generator";

export const metadata: Metadata = {
  title: "Password Generator — Create Strong Secure Passwords",
  description: "Generate strong, secure passwords with customizable length, symbols, and numbers. Includes a password strength meter. Everything runs in your browser.",
  alternates: { canonical: "/tools/password-generator" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Password Generator & Strength Meter"
      description="Generate cryptographically secure passwords with customizable options and instantly check their strength — all processed locally in your browser."
      howToUse={[
        "Set your desired password length and toggle options like uppercase, lowercase, numbers, and symbols.",
        "Click Generate to create a secure random password instantly.",
        "Review the strength meter and copy the password to your clipboard with one click.",
      ]}
      faqs={[
        { question: "Are the generated passwords stored anywhere?", answer: "No. All passwords are generated entirely in your browser using the Web Crypto API. Nothing is ever sent to a server or stored anywhere." },
        { question: "How long should a strong password be?", answer: "Security experts recommend at least 12-16 characters. Longer passwords with a mix of uppercase, lowercase, numbers, and symbols are exponentially harder to crack." },
        { question: "What makes a password strong?", answer: "A strong password is long, random, and uses a mix of character types. Avoid dictionary words, personal information, and common patterns like '123456' or 'password'." },
      ]}
    >
      <PasswordGenerator />
    </ToolPageWrapper>
  );
}
