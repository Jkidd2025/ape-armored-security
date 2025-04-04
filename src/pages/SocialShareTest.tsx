
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusAlerts } from '@/components/social-share/StatusAlerts';
import { MetaTagsDisplay } from '@/components/social-share/MetaTagsDisplay';
import { ImagePreview } from '@/components/social-share/ImagePreview';
import { PlatformDebuggers } from '@/components/social-share/PlatformDebuggers';

const SocialShareTest = () => {
  const [metaTags, setMetaTags] = useState<{property: string, content: string}[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // This is the correct CDN URL for the image
  const imageUrl = "https://opengraph.b-cdn.net/production/images/c0e75856-684c-46bb-95b6-0a8600e74561.png?token=BrjgXSURgOH7iiLLMV2Yeev3JJLliUYjp3MpphrD8bM&height=630&width=1200&expires=33279735402";

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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gradient-gold">Social Media Sharing Test Page</h1>
        
        <StatusAlerts 
          imageLoaded={imageLoaded} 
          imageError={imageError} 
          lastUpdated={lastUpdated} 
        />
        
        <MetaTagsDisplay 
          metaTags={metaTags} 
          refreshPage={refreshPage} 
          lastUpdated={lastUpdated} 
        />
        
        <ImagePreview 
          imageUrl={imageUrl}
          imageLoaded={imageLoaded}
          imageError={imageError}
          setImageLoaded={setImageLoaded}
          setImageError={setImageError}
        />
        
        <Separator />
        
        <PlatformDebuggers />
        
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
