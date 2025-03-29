import { Twitter, Github, Linkedin, Mail } from "lucide-react";

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
              <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                  Disclaimer
                </a>
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
