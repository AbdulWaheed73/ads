import { Zap, Shield, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Most tools run entirely in your browser with zero server round-trips. Get instant results without waiting.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description:
      "Your data never leaves your device. Client-side tools process everything locally — no uploads, no tracking.",
  },
  {
    icon: Heart,
    title: "Always Free",
    description:
      "No sign-ups, no premium tiers, no usage limits. Every tool is completely free to use, forever.",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose WebToolKit?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center border-0 bg-transparent shadow-none">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
