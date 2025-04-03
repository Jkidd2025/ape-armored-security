
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const SocialShareTest = () => {
  useEffect(() => {
    // Log that the page is loaded to help with debugging
    console.log('Social Share Test page loaded');
    
    // Force metadata refresh when this page loads
    const metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
      const name = metaTags[i].getAttribute('property') || metaTags[i].getAttribute('name');
      const content = metaTags[i].getAttribute('content');
      if ((name && name.includes('og:')) || (name && name.includes('twitter:'))) {
        console.log(`Meta tag ${name}: ${content}`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gradient-gold">Social Media Sharing Test Page</h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Meta Tags:</h2>
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
          <h2 className="text-xl font-semibold">Image Preview:</h2>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/5a70e743-1c9c-4a26-b070-1550be168a7c.png" 
              alt="Social Share Image" 
              className="max-w-full h-auto border rounded-md"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Testing Tools:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a 
                href="https://developers.facebook.com/tools/debug/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-apearmor-teal hover:underline"
              >
                Facebook Sharing Debugger
              </a>
              {" - Forces Facebook to clear the cache and re-scrape your website"}
            </li>
            <li>
              <a 
                href="https://cards-dev.twitter.com/validator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-apearmor-teal hover:underline"
              >
                Twitter Card Validator
              </a>
              {" - Test how your site appears when shared on Twitter"}
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/post-inspector/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-apearmor-teal hover:underline"
              >
                LinkedIn Post Inspector
              </a>
              {" - Test your website's LinkedIn preview"}
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
