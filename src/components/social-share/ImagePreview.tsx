
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from 'lucide-react';

type ImagePreviewProps = {
  imageUrl: string;
  imageLoaded: boolean;
  imageError: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
}

export const ImagePreview = ({ 
  imageUrl, 
  imageLoaded, 
  imageError, 
  setImageLoaded, 
  setImageError 
}: ImagePreviewProps) => {
  const [copied, setCopied] = useState(false);

  const copyImageUrl = () => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
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
  );
};
