import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { TimestampConverter } from "@/components/tools/timestamp-converter";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch to Date & Date to Epoch",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, multiple time zones, and ISO 8601 output.",
  alternates: { canonical: "/tools/timestamp-converter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="Unix Timestamp Converter"
      slug="timestamp-converter"
      description="Quickly convert between Unix epoch timestamps and human-readable dates. Paste a timestamp in seconds or milliseconds to see the corresponding date and time, or pick a date to get its epoch value. The tool supports multiple time zones, ISO 8601 formatting, and shows the current Unix time as a live reference."
      howToUse={[
        "Enter a Unix timestamp (in seconds or milliseconds) in the input field to instantly see the corresponding human-readable date and time.",
        "Alternatively, pick a date and time using the date picker to convert it into a Unix epoch value.",
        "Select your desired time zone and output format, then copy the result to your clipboard.",
      ]}
      faqs={[
        {
          question: "What is Unix time?",
          answer:
            "Unix time (also called POSIX time or epoch time) is a system for tracking time as a running total of seconds since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It is used extensively in programming, databases, and APIs because it is time-zone-independent and easy to perform arithmetic on.",
        },
        {
          question: "What is the Unix epoch?",
          answer:
            "The Unix epoch is the reference point of January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC). All Unix timestamps are measured as the number of seconds elapsed since this moment. Dates before the epoch are represented as negative numbers.",
        },
        {
          question: "What is the Year 2038 problem?",
          answer:
            "The Year 2038 problem (Y2038) occurs because many older systems store Unix time as a signed 32-bit integer, which can only represent dates up to January 19, 2038 at 03:14:07 UTC. After that moment the value overflows and wraps to a negative number, potentially causing software failures. Modern systems mitigate this by using 64-bit integers, which extend the range billions of years into the future.",
        },
      ]}
    >
      <TimestampConverter />
    </ToolPageWrapper>
  );
}
