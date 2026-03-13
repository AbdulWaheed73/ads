import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { BaseConverter } from "@/components/tools/base-converter";

export const metadata: Metadata = {
  title: "Number Base Converter — Binary, Octal, Decimal, Hex",
  description:
    "Convert numbers between binary, octal, decimal, and hexadecimal bases instantly. Supports large integers and custom bases from 2 to 36.",
  alternates: { canonical: "/tools/base-converter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Number Base Converter"
      slug="base-converter"
      description="Convert numbers between binary (base 2), octal (base 8), decimal (base 10), hexadecimal (base 16), and any custom base up to 36. Enter a value in one field and see all other representations update in real time. Ideal for programmers, students, and anyone working with low-level data representations or digital electronics."
      howToUse={[
        "Enter a number in any of the base fields — binary, octal, decimal, or hexadecimal.",
        "All other base representations update automatically as you type.",
        "Copy the converted value you need, or switch to a custom base by selecting a radix between 2 and 36.",
      ]}
      faqs={[
        {
          question: "Why do programmers use different number bases?",
          answer:
            "Different bases map naturally to different domains. Binary (base 2) mirrors how digital circuits store data as on/off states. Hexadecimal (base 16) is a compact way to represent binary since each hex digit corresponds to exactly four bits. Octal (base 8) was historically used in Unix file permissions. Using the right base makes certain patterns and values much easier to read and reason about.",
        },
        {
          question: "How does base conversion work mathematically?",
          answer:
            "To convert a number from one base to another, you first expand it into its decimal value by multiplying each digit by its positional power of the source base, then repeatedly divide the result by the target base, collecting remainders. For example, binary 1010 equals 1x8 + 0x4 + 1x2 + 0x1 = 10 in decimal, and dividing 10 by 16 gives 0 remainder A, so the hex representation is A.",
        },
        {
          question: "What are common real-world use cases for hex and binary?",
          answer:
            "Hexadecimal is used extensively in CSS color codes (#FF5733), memory addresses, MAC addresses, and cryptographic hashes. Binary is fundamental in networking (subnet masks like 11111111.11111111.11111111.00000000), bitwise operations in code, and understanding how processors execute instructions at the hardware level.",
        },
      ]}
    >
      <BaseConverter />
    </ToolPageWrapper>
  );
}
