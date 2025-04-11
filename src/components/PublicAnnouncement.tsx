
import React from "react";
import { Megaphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PublicAnnouncementProps {
  message: string;
}

const PublicAnnouncement = ({ message }: PublicAnnouncementProps) => {
  return (
    <Alert className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none mb-6">
      <Megaphone className="h-5 w-5 mr-2" />
      <AlertDescription className="text-white font-medium">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default PublicAnnouncement;
