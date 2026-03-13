import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools-data";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary dark:text-blue-400" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {tool.type === "client" ? "Browser" : "Server"}
            </Badge>
          </div>
          <CardTitle className="text-lg mt-3">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            {tool.description}
          </p>
          <span className="text-sm font-medium text-primary dark:text-blue-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Try it now <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
