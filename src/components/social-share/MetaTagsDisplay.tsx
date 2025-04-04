
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from 'lucide-react';

type MetaTagsDisplayProps = {
  metaTags: { property: string, content: string }[];
  refreshPage: () => void;
  lastUpdated: Date;
}

export const MetaTagsDisplay = ({ metaTags, refreshPage, lastUpdated }: MetaTagsDisplayProps) => {
  // Check if any meta tags still have the old image URL
  const hasOldImageUrl = metaTags.some(tag => 
    tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png')
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Current Meta Tags:</h2>
        <Button variant="outline" size="sm" onClick={refreshPage}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      {hasOldImageUrl && (
        <div className="bg-amber-50 text-amber-800 p-3 rounded-md flex items-center text-sm">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
          <span>Found references to outdated image URL. Please clear your browser cache and refresh.</span>
        </div>
      )}
      
      <div className="bg-muted p-4 rounded-md overflow-auto max-h-80">
        {metaTags.length > 0 ? (
          <pre className="text-xs">
            {metaTags.map((tag, index) => (
              <div key={index} className={tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png') ? 'text-red-500 line-through' : ''}>
                {`${tag.property}: ${tag.content}\n`}
              </div>
            ))}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">No OG or Twitter card meta tags found.</p>
        )}
      </div>
    </div>
  );
};
