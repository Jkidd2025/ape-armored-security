
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

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

  return (
    <div className="space-y-4">
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
      <div className="text-sm bg-blue-50 p-4 rounded-md border border-blue-200">
        <p className="font-medium text-blue-800 mb-2">Important Debugging Tips:</p>
        <ul className="list-disc pl-5 space-y-1 text-blue-700">
          <li>Meta tags have been updated with the new image URL from opengraph.b-cdn.net</li>
          <li>After changes to meta tags, use the Facebook debugger to force a cache refresh</li>
          <li>Some platforms cache previews for up to 24 hours</li>
          <li>The current image is properly sized (1200×630 pixels)</li>
          <li>All URLs are absolute (starting with https://)</li>
          <li>Test your site from the actual production URL, not localhost</li>
        </ul>
      </div>
    </div>
  );
};
