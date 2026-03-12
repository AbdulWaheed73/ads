import Link from "next/link";
import { tools } from "@/lib/tools-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedToolsProps {
  currentSlug: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const related = tools
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Related Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm hover:bg-muted transition-colors"
          >
            <tool.icon className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{tool.name}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
