
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

const SocialShareTest = () => {
  const [copied, setCopied] = useState(false);
  const imageUrl = "https://apearmorsecure.com/lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Log that the page is loaded to help with debugging
    console.log('Social Share Test page loaded');
    
    // Force metadata refresh when this page loads
    const metaTags = document.getElementsByTagName('meta');
    console.log('Checking meta tags...');
    for (let i = 0; i < metaTags.length; i++) {
      const name = metaTags[i].getAttribute('property') || metaTags[i].getAttribute('name');
      const content = metaTags[i].getAttribute('content');
      if ((name && name.includes('og:')) || (name && name.includes('twitter:'))) {
        console.log(`Meta tag ${name}: ${content}`);
      }
    }

    // Check if the image is directly accessible
    const testImage = new Image();
    testImage.onload = () => {
      console.log('Image loaded successfully in background test');
      setImageLoaded(true);
    };
    testImage.onerror = () => {
      console.error('Failed to load image in background test');
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gradient-gold">Social Media Sharing Test Page</h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Current Meta Tags:</h2>
            <Button variant="outline" size="sm" onClick={refreshPage}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="bg-muted p-4 rounded-md overflow-auto max-h-80">
            <pre className="text-xs">
              {Array.from(document.getElementsByTagName('meta'))
                .filter(meta => {
                  const prop = meta.getAttribute('property');
                  const name = meta.getAttribute('name');
                  return (prop && prop.includes('og:')) || 
                         (name && name.includes('twitter:'));
                })
                .map(meta => {
                  const prop = meta.getAttribute('property') || meta.getAttribute('name');
                  return `${prop}: ${meta.getAttribute('content')}`;
                })
                .join('\n')}
            </pre>
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
                e.currentTarget.src = "/placeholder.svg";
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
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Testing Tools:</h2>
          <ul className="grid gap-2">
            <li className="p-3 border rounded-md hover:bg-muted">
              <a 
                href="https://developers.facebook.com/tools/debug/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-apearmor-teal hover:underline"
              >
                <span>Facebook Sharing Debugger</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <p className="text-sm text-muted-foreground mt-1">Forces Facebook to clear the cache and re-scrape your website</p>
            </li>
            <li className="p-3 border rounded-md hover:bg-muted">
              <a 
                href="https://cards-dev.twitter.com/validator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-apearmor-teal hover:underline"
              >
                <span>Twitter Card Validator</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <p className="text-sm text-muted-foreground mt-1">Test how your site appears when shared on Twitter</p>
            </li>
            <li className="p-3 border rounded-md hover:bg-muted">
              <a 
                href="https://www.linkedin.com/post-inspector/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between text-apearmor-teal hover:underline"
              >
                <span>LinkedIn Post Inspector</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <p className="text-sm text-muted-foreground mt-1">Test your website's LinkedIn preview</p>
            </li>
          </ul>
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
