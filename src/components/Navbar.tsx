
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDevEnvironment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';

  const handlePaymentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    navigate('/payment');
    window.scrollTo(0, 0);
  };
  
  const handlePresaleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    navigate('/presale-application');
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-apearmor-darkbronze">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
              alt="ApeArmor Logo" 
              className="h-14 w-14 md:h-16 md:w-16" 
            />
          </Link>
          <Link to="/" className="text-xl font-bold text-gradient-gold">ApeArmor</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Features</a>
          <a href="#packages" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Packages</a>
          <a href="#about" className="text-sm font-medium hover:text-apearmor-teal transition-colors">About</a>
          <a href="#roadmap" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Roadmap</a>
          <a href="#approved" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Approved</a>
          <a href="#nft-collection" className="text-sm font-medium hover:text-apearmor-teal transition-colors">NFTs</a>
          <Link to="/whitepaper" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Whitepaper</Link>
          <a href="#contact" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Contact</a>
          <Link to="/presale-application" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Presale</Link>
          
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
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b border-apearmor-darkbronze transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col px-4 py-4 gap-4">
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
          <Link 
            to="/whitepaper" 
            className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Whitepaper
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
          
          <Button 
            className="mt-4 bg-apearmor-teal hover:bg-apearmor-teal/80 text-black w-full mx-4"
            onClick={handlePaymentClick}
          >
            Apply Payment
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
