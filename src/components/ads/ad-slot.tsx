"use client";

interface AdSlotProps {
  format: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

const formatStyles = {
  horizontal: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  vertical: "min-h-[600px]",
};

export function AdSlot({ format, className = "" }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (adClient) {
    return (
      <div className={`w-full ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: formatStyles[format].replace("min-h-[", "").replace("]", "") }}
          data-ad-client={adClient}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full flex items-center justify-center border border-dashed border-muted-foreground/30 rounded-lg bg-muted/10 ${formatStyles[format]} ${className}`}
    >
      <span className="text-xs text-muted-foreground">Advertisement</span>
    </div>
  );
}
