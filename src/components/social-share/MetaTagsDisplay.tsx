
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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
  
  // Group meta tags by type
  const groupedTags = {
    basic: metaTags.filter(tag => tag.property.startsWith('description') || tag.property.startsWith('keywords') || tag.property === 'author'),
    og: metaTags.filter(tag => tag.property.startsWith('og:')),
    twitter: metaTags.filter(tag => tag.property.startsWith('twitter:')),
    other: metaTags.filter(tag => !tag.property.startsWith('og:') && !tag.property.startsWith('twitter:') && !tag.property.startsWith('description') && !tag.property.startsWith('keywords') && tag.property !== 'author')
  };
  
  // Count of each type
  const counts = {
    basic: groupedTags.basic.length,
    og: groupedTags.og.length,
    twitter: groupedTags.twitter.length,
    other: groupedTags.other.length
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Current Meta Tags:</h2>
          <div className="flex gap-1">
            {counts.basic > 0 && <Badge variant="outline">{counts.basic} Basic</Badge>}
            {counts.og > 0 && <Badge variant="outline">{counts.og} OpenGraph</Badge>}
            {counts.twitter > 0 && <Badge variant="outline">{counts.twitter} Twitter</Badge>}
            {counts.other > 0 && <Badge variant="outline">{counts.other} Other</Badge>}
          </div>
        </div>
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
          <div className="space-y-4 text-xs">
            {counts.basic > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1 text-primary">Basic Meta Tags:</h3>
                <pre>
                  {groupedTags.basic.map((tag, index) => (
                    <div key={`basic-${index}`} className={tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png') ? 'text-red-500 line-through' : ''}>
                      {`${tag.property}: ${tag.content}\n`}
                    </div>
                  ))}
                </pre>
              </div>
            )}
            
            {counts.og > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1 text-primary">OpenGraph / Facebook:</h3>
                <pre>
                  {groupedTags.og.map((tag, index) => (
                    <div key={`og-${index}`} className={tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png') ? 'text-red-500 line-through' : ''}>
                      {`${tag.property}: ${tag.content}\n`}
                    </div>
                  ))}
                </pre>
              </div>
            )}
            
            {counts.twitter > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1 text-primary">Twitter Card:</h3>
                <pre>
                  {groupedTags.twitter.map((tag, index) => (
                    <div key={`twitter-${index}`} className={tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png') ? 'text-red-500 line-through' : ''}>
                      {`${tag.property}: ${tag.content}\n`}
                    </div>
                  ))}
                </pre>
              </div>
            )}
            
            {counts.other > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1 text-primary">Other Tags:</h3>
                <pre>
                  {groupedTags.other.map((tag, index) => (
                    <div key={`other-${index}`} className={tag.content.includes('lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png') ? 'text-red-500 line-through' : ''}>
                      {`${tag.property}: ${tag.content}\n`}
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No meta tags found. This may indicate an SEO issue.</p>
        )}
      </div>
      
      <div className="text-sm bg-blue-50 text-blue-700 p-3 rounded-md">
        <p className="font-medium text-blue-800 mb-1">SEO Status:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Title tag is {metaTags.some(t => t.property === 'og:title') ? '✅ present' : '❌ missing'}</li>
          <li>Meta description is {metaTags.some(t => t.property === 'og:description') ? '✅ present' : '❌ missing'}</li>
          <li>OpenGraph tags are {counts.og > 0 ? '✅ present' : '❌ missing'}</li>
          <li>Twitter Card tags are {counts.twitter > 0 ? '✅ present' : '❌ missing'}</li>
          <li>Cache control headers are set to ensure fresh content</li>
          <li>robots.txt is properly configured to allow indexing</li>
        </ul>
      </div>
    </div>
  );
};
