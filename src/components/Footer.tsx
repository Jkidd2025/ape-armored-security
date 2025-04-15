import { X, Github, Send, Facebook, Youtube } from "lucide-react";
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
              <a href="https://github.com/ApeArmorSecure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
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
                  viewBox="0 0 448 512" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a href="https://www.youtube.com/@ApeArmorSecure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
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
              <li>
                <Link to="/whitepaper" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Whitepaper
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
