
import { X, Github, Send, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-apearmor-darkbronze">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
                alt="ApeArmor Logo" 
                className="h-14 w-14" 
              />
              <span className="text-xl font-bold text-gradient-gold">ApeArmor</span>
            </div>
            
            <p className="text-muted-foreground mb-4 max-w-md">
              ApeArmor provides robust protection against scams, rug pulls, and security threats in the crypto space. Ape in with confidence – we've got your back.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://x.com/ApeArmorSecure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574761749148" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://t.me/ape_armor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Send className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </a>
              <a href="https://www.tiktok.com/@ape.armor" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                  <path d="M15 8h.01"/>
                  <path d="M11 16H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-3.5"/>
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#packages" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#nft-collection" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  NFT Collection
                </a>
              </li>
              <li>
                <a href="#dao" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  DAO
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/claim-submission" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Submit a Claim
                </Link>
              </li>
              <li>
                <Link to="/presale-application" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Presale Application
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-apearmor-darkbronze mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} ApeArmor. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground">
            Designed with 🛡️ by <span className="text-apearmor-teal">ApeArmor Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
