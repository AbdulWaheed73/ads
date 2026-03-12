"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?/`~",
};

function generatePassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): string {
  let charset = "";
  if (options.uppercase) charset += CHARSETS.uppercase;
  if (options.lowercase) charset += CHARSETS.lowercase;
  if (options.numbers) charset += CHARSETS.numbers;
  if (options.symbols) charset += CHARSETS.symbols;

  if (charset.length === 0) return "";

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (n) => charset[n % charset.length]).join("");
}

function getStrength(
  password: string,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean }
): { label: string; color: string; width: number } {
  if (password.length === 0) return { label: "None", color: "bg-muted", width: 0 };

  const enabledSets = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;
  const length = password.length;

  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (length >= 24) score++;
  score += enabledSets;

  if (score <= 3) return { label: "Weak", color: "bg-red-500", width: 33 };
  if (score <= 5) return { label: "Medium", color: "bg-yellow-500", width: 66 };
  return { label: "Strong", color: "bg-green-500", width: 100 };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    setPassword(generatePassword(length, options));
  }, [length, options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard");
  };

  const strength = getStrength(password, options);

  const toggleOptions: { key: keyof typeof options; label: string }[] = [
    { key: "uppercase", label: "Uppercase (A-Z)" },
    { key: "lowercase", label: "Lowercase (a-z)" },
    { key: "numbers", label: "Numbers (0-9)" },
    { key: "symbols", label: "Symbols (!@#$...)" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 overflow-x-auto rounded-lg bg-muted px-4 py-3 font-mono text-sm break-all">
              {password || "Enable at least one character set"}
            </code>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </Button>
          </div>

          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Strength: {strength.label}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${strength.color}`}
                style={{ width: `${strength.width}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password Length</label>
              <span className="text-sm font-mono text-muted-foreground">
                {length}
              </span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(val: number | readonly number[]) => {
                setLength(Array.isArray(val) ? val[0] : val);
              }}
              min={4}
              max={128}
              step={1}
            />
          </div>

          <div className="space-y-4">
            {toggleOptions.map((opt) => (
              <div key={opt.key} className="flex items-center justify-between">
                <label className="text-sm font-medium">{opt.label}</label>
                <Switch
                  checked={options[opt.key]}
                  onCheckedChange={(checked: boolean) =>
                    setOptions((prev) => ({ ...prev, [opt.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>

          <Button onClick={generate} className="w-full">
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
