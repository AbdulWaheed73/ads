import type { Metadata } from "next";
import { ToolPageWrapper } from "@/components/tools/tool-page-wrapper";
import { TimeConverter } from "@/components/tools/time-converter";

export const metadata: Metadata = {
  title: "World Time Converter — Convert Time Zones Instantly",
  description: "Convert time between any time zones instantly. Compare multiple time zones side by side. Perfect for scheduling meetings across the globe.",
  alternates: { canonical: "/tools/time-converter" },
};

export default function Page() {
  return (
    <ToolPageWrapper
      name="World Time Converter"
      description="Instantly convert time between any time zones worldwide. Compare multiple zones side by side to find the perfect meeting time."
      howToUse={[
        "Select your source time zone and enter the time you want to convert.",
        "Add one or more target time zones to see the converted times side by side.",
        "Use the results to schedule meetings or coordinate across different regions.",
      ]}
      faqs={[
        { question: "Does this tool account for daylight saving time?", answer: "Yes, the converter automatically adjusts for daylight saving time (DST) transitions based on the current date and the rules for each time zone." },
        { question: "How many time zones are there in the world?", answer: "There are 24 standard time zones, but in practice there are over 38 unique UTC offsets because some regions use 30-minute or 45-minute offsets (e.g., India at UTC+5:30, Nepal at UTC+5:45)." },
        { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. It is essentially the same as GMT (Greenwich Mean Time) and serves as the reference point for all other time zones." },
      ]}
    >
      <TimeConverter />
    </ToolPageWrapper>
  );
}
