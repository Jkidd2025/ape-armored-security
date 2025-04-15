
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDevEnvironment } from "@/hooks/use-dev-environment";
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDevEnvironment = useDevEnvironment();
  
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
        <Logo />
        
        <DesktopNav 
          isDevEnvironment={isDevEnvironment} 
          handlePaymentClick={handlePaymentClick} 
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        isDevEnvironment={isDevEnvironment}
        handlePaymentClick={handlePaymentClick}
        handlePresaleClick={handlePresaleClick}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
};

export default Navbar;
