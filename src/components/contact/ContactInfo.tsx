import React from "react";
import { Mail, Phone, Github, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  return (
    <Card className="border-apearmor-darkbronze h-full">
      <CardContent className="p-6 flex flex-col space-y-6">
        <h3 className="text-xl font-semibold">Get in Touch</h3>
        
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-apearmor-teal mt-0.5" />
          <div>
            <h4 className="font-medium">Email</h4>
            <p className="text-muted-foreground">support@apearmor.com</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-apearmor-teal mt-0.5" />
          <div>
            <h4 className="font-medium">Phone</h4>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="https://github.com/ApeArmorSecure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/channel/UCXDVfHy6UMRHCwGCJtrT32g" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
