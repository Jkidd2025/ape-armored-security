
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isMenuOpen: boolean;
  isDevEnvironment: boolean;
  handlePaymentClick: (e: React.MouseEvent) => void;
  handlePresaleClick: (e: React.MouseEvent) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({
  isMenuOpen,
  isDevEnvironment,
  handlePaymentClick,
  handlePresaleClick,
  setIsMenuOpen
}: MobileMenuProps) => {
  return (
    <div className={cn(
      "md:hidden absolute w-full bg-background border-b border-apearmor-darkbronze transition-all duration-300 overflow-hidden",
      isMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
    )}>
      <nav className="flex flex-col px-4 py-4 gap-2">
        <a 
          href="#features" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#packages" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Packages
        </a>
        <a 
          href="#about" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </a>
        <a 
          href="#roadmap" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Roadmap
        </a>
        <a 
          href="#approved" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Approved
        </a>
        <a 
          href="#nft-collection" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          NFTs
        </a>
        <a 
          href="#dao" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          DAO
        </a>
        <Link 
          to="/whitepaper" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Whitepaper
        </Link>
        <Link 
          to="/ape-wire" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Ape Wire
        </Link>
        <Link 
          to="/swap" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Swap
        </Link>
        <a 
          href="#contact" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </a>
        <Link 
          to="/presale-application" 
          className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Presale
        </Link>
        
        {isDevEnvironment && (
          <Link 
            to="/social-share-test" 
            className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Share2 className="h-4 w-4" />
            <span>Share Test</span>
          </Link>
        )}
        
        <div className="mt-4 pt-4 border-t border-apearmor-darkbronze">
          <Button 
            className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
            onClick={handlePaymentClick}
          >
            Apply Payment
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
