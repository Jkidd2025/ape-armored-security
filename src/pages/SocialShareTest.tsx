
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const SocialShareTest = () => {
  const [copied, setCopied] = useState(false);
  const imageUrl = "https://opengraph.b-cdn.net/production/images/c0e75856-684c-46bb-95b6-0a8600e74561.png?token=BrjgXSURgOH7iiLLMV2Yeev3JJLliUYjp3MpphrD8bM&height=630&width=1200&expires=33279735402";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [metaTags, setMetaTags] = useState<{property: string, content: string}[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Log that the page is loaded to help with debugging
    console.log('Social Share Test page loaded');
    
    // Force metadata refresh when this page loads
    const tags = document.getElementsByTagName('meta');
    console.log('Checking meta tags...');
    
    const relevantTags: {property: string, content: string}[] = [];
    
    for (let i = 0; i < tags.length; i++) {
      const name = tags[i].getAttribute('property') || tags[i].getAttribute('name');
      const content = tags[i].getAttribute('content');
      if ((name && (name.includes('og:') || name.includes('twitter:'))) && content) {
        console.log(`Meta tag ${name}: ${content}`);
        relevantTags.push({property: name, content});
      }
    }
    
    setMetaTags(relevantTags);
    setLastUpdated(new Date());

    // Check if the image is directly accessible
    const testImage = new Image();
    testImage.onload = () => {
      console.log('Image loaded successfully in background test');
      setImageLoaded(true);
    };
    testImage.onerror = (e) => {
      console.error('Failed to load image in background test', e);
      setImageError(true);
    };
    testImage.src = imageUrl;

    return () => {
      testImage.onload = null;
      testImage.onerror = null;
    };
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gradient-gold">Social Media Sharing Test Page</h1>
        
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Meta Tags Updated</AlertTitle>
          <AlertDescription className="text-blue-700">
            Using new image from opengraph.b-cdn.net. Last checked: {lastUpdated.toLocaleTimeString()}
          </AlertDescription>
        </Alert>
        
        {!imageLoaded && !imageError && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Checking image accessibility</AlertTitle>
            <AlertDescription className="text-amber-700">
              Currently testing if the social media image is publicly accessible...
            </AlertDescription>
          </Alert>
        )}
        
        {imageError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Critical Error</AlertTitle>
            <AlertDescription>
              The social share image failed to load. This means social platforms won't be able to display it.
              Please check that the URL is publicly accessible and the image exists.
            </AlertDescription>
          </Alert>
        )}
        
        {imageLoaded && !imageError && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Image Accessible</AlertTitle>
            <AlertDescription className="text-green-700">
              The social share image loaded successfully. This is a good sign that it will be accessible by social media platforms.
            </AlertDescription>
          </Alert>
        )}
        
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
                {metaTags.map((tag, index) => (
                  `${tag.property}: ${tag.content}\n`
                ))}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">No OG or Twitter card meta tags found.</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Image Preview:</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyImageUrl}
              className="flex items-center gap-1"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy URL"}
            </Button>
          </div>
          <div className="flex justify-center">
            <img 
              src={imageUrl}
              alt="Social Share Image" 
              className={`max-w-full h-auto border rounded-md ${imageError ? 'border-red-500' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error("Image failed to load in component");
                setImageError(true);
                // @ts-ignore
                e.currentTarget.src = "/placeholder.svg";
                // @ts-ignore
                e.currentTarget.alt = "Image load error";
              }}
            />
          </div>
          <div className="text-sm text-center">
            {imageError ? (
              <p className="text-red-500">
                Error: Image failed to load. Check if the URL is publicly accessible: {imageUrl}
              </p>
            ) : imageLoaded ? (
              <p className="text-green-500">
                Image loaded successfully. URL: {imageUrl}
              </p>
            ) : (
              <p className="text-amber-500">
                Loading image... URL: {imageUrl}
              </p>
            )}
          </div>
        </div>
        
        <Separator />
        
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
        
        <div className="pt-4 flex justify-center">
          <Link to="/">
            <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialShareTest;
