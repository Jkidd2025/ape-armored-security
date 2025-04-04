
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type StatusAlertsProps = {
  imageLoaded: boolean;
  imageError: boolean;
  lastUpdated: Date;
}

export const StatusAlerts = ({ imageLoaded, imageError, lastUpdated }: StatusAlertsProps) => {
  return (
    <>
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
    </>
  );
};
