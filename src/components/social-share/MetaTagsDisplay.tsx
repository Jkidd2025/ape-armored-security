
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';

type MetaTagsDisplayProps = {
  metaTags: { property: string, content: string }[];
  refreshPage: () => void;
  lastUpdated: Date;
}

export const MetaTagsDisplay = ({ metaTags, refreshPage, lastUpdated }: MetaTagsDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Current Meta Tags:</h2>
        <Button variant="outline" size="sm" onClick={refreshPage}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      <div className="bg-muted p-4 rounded-md overflow-auto max-h-80">
        {metaTags.length > 0 ? (
          <pre className="text-xs">
            {metaTags.map((tag) => (
              `${tag.property}: ${tag.content}\n`
            ))}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">No OG or Twitter card meta tags found.</p>
        )}
      </div>
    </div>
  );
};
