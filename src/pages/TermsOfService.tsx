
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TermsAndConditions from "@/components/signup/TermsAndConditions";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-apearmor-gold drop-shadow-md">
              Terms of Service
            </h1>
            <div className="h-1 w-32 bg-gradient-gold mx-auto mt-3 rounded-full"></div>
          </div>
          
          <TermsAndConditions>
            <div className="flex justify-center mt-6">
              <Button 
                asChild
                className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-medium px-6 py-2"
              >
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </TermsAndConditions>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
