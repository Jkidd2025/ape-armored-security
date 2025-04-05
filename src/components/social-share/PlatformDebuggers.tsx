
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PlatformDebuggers = () => {
  const testFacebookDebugger = () => {
    window.open(`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  const testTwitterValidator = () => {
    window.open('https://cards-dev.twitter.com/validator', '_blank');
  };

  const testLinkedInDebugger = () => {
    window.open('https://www.linkedin.com/post-inspector/', '_blank');
  };

  const testGoogleStructured = () => {
    window.open('https://search.google.com/test/rich-results', '_blank');
  };

  const testGoogleMobile = () => {
    window.open(`https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  const testPageSpeed = () => {
    window.open(`https://pagespeed.web.dev/report?url=${encodeURIComponent(window.location.origin)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="sharing">
        <TabsList className="w-full">
          <TabsTrigger value="sharing" className="flex-1">Social Sharing</TabsTrigger>
          <TabsTrigger value="seo" className="flex-1">SEO Tools</TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sharing" className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">Test on Major Platforms:</h2>
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-between" 
              onClick={testFacebookDebugger}
            >
              <span>Test on Facebook Sharing Debugger</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={testTwitterValidator}
            >
              <span>Test on Twitter Card Validator</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="w-full justify-between"
              onClick={testLinkedInDebugger}
            >
              <span>Test on LinkedIn Post Inspector</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">SEO Testing Tools:</h2>
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-between" 
              onClick={() => window.open(`https://search.google.com/search-console`, '_blank')}
            >
              <span>Google Search Console</span>
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={testGoogleStructured}
            >
              <span>Google Rich Results Test</span>
              <Code className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              className="w-full justify-between"
              onClick={testGoogleMobile}
            >
              <span>Google Mobile-Friendly Test</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-3 pt-2">
          <h2 className="text-xl font-semibold">Performance Testing:</h2>
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-between" 
              onClick={testPageSpeed}
            >
              <span>Google PageSpeed Insights</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => window.open('https://www.webpagetest.org/', '_blank')}
            >
              <span>WebPageTest.org</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-sm bg-blue-50 p-4 rounded-md border border-blue-200">
        <p className="font-medium text-blue-800 mb-2">SEO & Sharing Tips:</p>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Meta tags have been updated with the new image URL from opengraph.b-cdn.net</li>
          <li>After changes to meta tags, use the Facebook debugger to force a cache refresh</li>
          <li>Use structured data (JSON-LD) to enhance search results with rich snippets</li>
          <li>The current image is properly sized (1200×630 pixels) for optimal sharing</li>
          <li>All URLs are absolute (starting with https://)</li>
          <li>Test your site from the actual production URL, not localhost</li>
          <li>Ensure your robots.txt allows search engines to crawl important pages</li>
        </ul>
      </div>
    </div>
  );
};
