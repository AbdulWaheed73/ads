"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Copy } from "lucide-react";

export function TimestampConverter() {
  const [now, setNow] = useState(0);
  const [epochInput, setEpochInput] = useState("");
  const [epochResult, setEpochResult] = useState<{ local: string; iso: string } | null>(null);
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [dateResult, setDateResult] = useState<string | null>(null);

  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertEpoch = useCallback(() => {
    const ts = Number(epochInput);
    if (isNaN(ts)) {
      toast.error("Invalid epoch timestamp");
      return;
    }
    // Auto-detect seconds vs milliseconds
    const ms = ts > 1e12 ? ts : ts * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) {
      toast.error("Invalid epoch timestamp");
      return;
    }
    setEpochResult({
      local: date.toLocaleString(),
      iso: date.toISOString(),
    });
  }, [epochInput]);

  const convertDate = useCallback(() => {
    if (!dateInput) {
      toast.error("Please select a date");
      return;
    }
    const dateStr = timeInput ? `${dateInput}T${timeInput}` : `${dateInput}T00:00:00`;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      toast.error("Invalid date/time");
      return;
    }
    setDateResult(Math.floor(date.getTime() / 1000).toString());
  }, [dateInput, timeInput]);

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Timestamp Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Current Unix Timestamp</p>
            <p className="text-2xl font-mono font-bold">{now}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => copyValue(now.toString())}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="epoch-to-date">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="epoch-to-date">Epoch → Date</TabsTrigger>
            <TabsTrigger value="date-to-epoch">Date → Epoch</TabsTrigger>
          </TabsList>

          <TabsContent value="epoch-to-date" className="space-y-4 mt-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Unix Timestamp</label>
              <Input
                type="number"
                placeholder="e.g. 1700000000"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <Button onClick={convertEpoch} disabled={!epochInput}>
              Convert
            </Button>
            {epochResult && (
              <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Local Time</p>
                    <p className="text-sm font-mono">{epochResult.local}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => copyValue(epochResult.local)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">ISO 8601</p>
                    <p className="text-sm font-mono">{epochResult.iso}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => copyValue(epochResult.iso)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="date-to-epoch" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  step="1"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
            <Button onClick={convertDate} disabled={!dateInput}>
              Convert
            </Button>
            {dateResult && (
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Unix Timestamp (seconds)</p>
                  <p className="text-lg font-mono font-bold">{dateResult}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => copyValue(dateResult)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
