
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
          <h1 className="text-3xl font-bold mb-8 text-gradient-gold">Terms of Service</h1>
          
          <TermsAndConditions>
            <div className="flex justify-center mt-6">
              <Button asChild>
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
