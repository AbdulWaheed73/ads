"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

const COMMON_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
  "UTC",
];

export function TimeConverter() {
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezone, setTargetTimezone] = useState("America/New_York");
  const [timeInput, setTimeInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  const allTimezones = useMemo(() => {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch {
      return COMMON_TIMEZONES;
    }
  }, []);

  const otherTimezones = useMemo(
    () => allTimezones.filter((tz) => !COMMON_TIMEZONES.includes(tz)),
    [allTimezones]
  );

  const convertedTime = useMemo(() => {
    if (!timeInput) return null;

    try {
      const dateStr = dateInput || new Date().toISOString().split("T")[0];
      const dateTimeStr = `${dateStr}T${timeInput}:00`;

      const sourceFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: sourceTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const targetDate = new Date(dateTimeStr);

      // Get UTC offset for source timezone to build the correct absolute time
      const sourceDate = new Date(dateTimeStr);
      const sourceStr = sourceFmt.format(sourceDate);
      void sourceStr;

      const targetFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: targetTimezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short",
      });

      // Build a proper date in the source timezone
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: sourceTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZoneName: "longOffset",
      }).formatToParts(targetDate);

      const offsetPart = parts.find((p) => p.type === "timeZoneName");
      const offsetStr = offsetPart?.value ?? "+00:00";

      const gmtMatch = offsetStr.match(/GMT([+-]\d{1,2}(?::\d{2})?)/);
      let isoOffset = "+00:00";
      if (gmtMatch) {
        const raw = gmtMatch[1];
        const [h, m] = raw.split(":");
        isoOffset = `${h.padStart(3, "0").replace(/^(\d)/, "+$1")}:${m || "00"}`;
        if (!isoOffset.startsWith("+") && !isoOffset.startsWith("-")) {
          isoOffset = `+${isoOffset}`;
        }
      }

      const isoStr = `${dateStr}T${timeInput}:00${isoOffset}`;
      const absoluteDate = new Date(isoStr);

      if (isNaN(absoluteDate.getTime())) {
        return null;
      }

      return targetFmt.format(absoluteDate);
    } catch {
      return null;
    }
  }, [timeInput, dateInput, sourceTimezone, targetTimezone]);

  const useCurrentTime = useCallback(() => {
    const now = new Date();
    const timeParts = new Intl.DateTimeFormat("en-US", {
      timeZone: sourceTimezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const hour = timeParts.find((p) => p.type === "hour")?.value ?? "00";
    const minute = timeParts.find((p) => p.type === "minute")?.value ?? "00";
    setTimeInput(`${hour}:${minute}`);

    const dateParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: sourceTimezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);

    const year = dateParts.find((p) => p.type === "year")?.value ?? "2024";
    const month = dateParts.find((p) => p.type === "month")?.value ?? "01";
    const day = dateParts.find((p) => p.type === "day")?.value ?? "01";
    setDateInput(`${year}-${month}-${day}`);
  }, [sourceTimezone]);

  const renderTimezoneOptions = () => (
    <>
      <SelectGroup>
        <SelectLabel>Common Timezones</SelectLabel>
        {COMMON_TIMEZONES.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz.replace(/_/g, " ")}
          </SelectItem>
        ))}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>All Timezones</SelectLabel>
        {otherTimezones.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz.replace(/_/g, " ")}
          </SelectItem>
        ))}
      </SelectGroup>
    </>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Zone Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Source Timezone</label>
              <Select
                value={sourceTimezone}
                onValueChange={(val: string | null) => val && setSourceTimezone(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>{renderTimezoneOptions()}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>

            <Button
              onClick={useCurrentTime}
              variant="outline"
              className="w-full"
            >
              <Clock className="h-4 w-4" />
              Use Current Time
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Timezone</label>
              <Select
                value={targetTimezone}
                onValueChange={(val: string | null) => val && setTargetTimezone(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>{renderTimezoneOptions()}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Converted Time</label>
              <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-4 min-h-[80px]">
                {convertedTime ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-4 w-4" />
                      Converted Result
                    </div>
                    <p className="text-lg font-semibold">{convertedTime}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Enter a time above to see the conversion
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
