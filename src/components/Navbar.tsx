
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-apearmor-darkbronze">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-apearmor-teal animate-pulse-shield" />
          <span className="text-xl font-bold text-gradient-gold">ApeArmor</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Features</a>
          <a href="#packages" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Packages</a>
          <a href="#about" className="text-sm font-medium hover:text-apearmor-teal transition-colors">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-apearmor-teal transition-colors">Contact</a>
        </nav>
        
        <div className="hidden md:flex items-center">
          <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
            Get Protected
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
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b border-apearmor-darkbronze transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
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
            href="#contact" 
            className="text-sm font-medium py-2 px-4 hover:bg-muted rounded-md hover:text-apearmor-teal transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <div className="mt-2">
            <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black w-full">
              Get Protected
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
