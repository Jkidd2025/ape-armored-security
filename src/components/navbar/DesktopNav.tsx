
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface DesktopNavProps {
  isDevEnvironment: boolean;
  handlePaymentClick: (e: React.MouseEvent) => void;
}

const DesktopNav = ({ isDevEnvironment, handlePaymentClick }: DesktopNavProps) => {
  return (
    <>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#features" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Features</a>
        <a href="#packages" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Packages</a>
        <a href="#ape-token" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Token</a>
        <a href="#about" className="text-sm font-medium hover:text-apearmor-teal transition-colors">About</a>
        <a href="#roadmap" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Roadmap</a>
        <a href="#approved" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Approved</a>
        <a href="#nft-collection" className="text-sm font-medium hover:text-apearmor-teal transition-colors">NFTs</a>
        <a href="#dao" className="text-sm font-medium hover:text-apearmor-teal transition-colors">DAO</a>
        <Link 
          to="/whitepaper" 
          className="text-sm font-medium hover:text-apearmor-teal transition-colors"
        >
          Whitepaper
        </Link>
        <Link 
          to="/ape-wire" 
          className="text-sm font-medium hover:text-apearmor-teal transition-colors"
        >
          Ape Wire
        </Link>
        <a href="#contact" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Contact</a>
        
        {isDevEnvironment && (
          <Link 
            to="/social-share-test" 
            className="text-sm font-medium hover:text-apearmor-teal transition-colors flex items-center gap-1"
            title="Social Share Testing Tool"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Test</span>
          </Link>
        )}
      </nav>
      
      <div className="hidden md:flex items-center">
        <Button 
          className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
          onClick={handlePaymentClick}
        >
          Apply Payment
        </Button>
      </div>
    </>
  );
};

export default DesktopNav;
