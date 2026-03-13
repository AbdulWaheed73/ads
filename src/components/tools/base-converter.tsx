"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";

interface BaseValues {
  binary: string;
  octal: string;
  decimal: string;
  hex: string;
}

const EMPTY: BaseValues = { binary: "", octal: "", decimal: "", hex: "" };

export function BaseConverter() {
  const [values, setValues] = useState<BaseValues>(EMPTY);
  const [error, setError] = useState<string | null>(null);

  const updateAll = useCallback((value: string, base: number, sourceKey: keyof BaseValues) => {
    if (value === "") {
      setValues(EMPTY);
      setError(null);
      return;
    }

    const parsed = parseInt(value, base);
    if (isNaN(parsed) || parsed < 0) {
      setValues((prev) => ({ ...prev, [sourceKey]: value }));
      setError("Invalid input for the selected base");
      return;
    }

    // Validate that the string is valid for the given base
    const validChars: Record<number, RegExp> = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^[0-9]+$/,
      16: /^[0-9a-fA-F]+$/,
    };

    if (!validChars[base].test(value)) {
      setValues((prev) => ({ ...prev, [sourceKey]: value }));
      setError("Invalid characters for the selected base");
      return;
    }

    setError(null);
    setValues({
      binary: parsed.toString(2),
      octal: parsed.toString(8),
      decimal: parsed.toString(10),
      hex: parsed.toString(16).toUpperCase(),
    });
  }, []);

  const fields: { key: keyof BaseValues; label: string; base: number; placeholder: string }[] = [
    { key: "binary", label: "Binary (Base 2)", base: 2, placeholder: "e.g. 1010" },
    { key: "octal", label: "Octal (Base 8)", base: 8, placeholder: "e.g. 12" },
    { key: "decimal", label: "Decimal (Base 10)", base: 10, placeholder: "e.g. 10" },
    { key: "hex", label: "Hexadecimal (Base 16)", base: 16, placeholder: "e.g. A" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Number Base Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Type in any field to automatically convert between number bases.
        </p>

        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="text-sm font-medium">{field.label}</label>
            <Input
              value={values[field.key]}
              onChange={(e) => updateAll(e.target.value.trim(), field.base, field.key)}
              placeholder={field.placeholder}
              className="font-mono text-sm"
            />
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
