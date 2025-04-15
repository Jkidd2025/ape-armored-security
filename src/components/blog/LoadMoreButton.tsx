
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface LoadMoreButtonProps {
  onClick: () => void;
  visible: boolean;
}

const LoadMoreButton = ({ onClick, visible }: LoadMoreButtonProps) => {
  if (!visible) return null;
  
  return (
    <div className="flex justify-center">
      <Button 
        className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        onClick={onClick}
      >
        Load More Articles
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default LoadMoreButton;
