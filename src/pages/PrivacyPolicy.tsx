
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gradient-gold">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">Ape Armor Secure LLC<br />Effective Date: 04/01/25</p>
            
            <p className="mb-6">
              Ape Armor Secure LLC ("Ape Armor," "we," "us," "our") values your privacy and is committed to protecting your personal information. 
              This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, 
              www.apearmorsecure.com, and when you use our services.
            </p>
            
            <p className="mb-6">
              By accessing or using our website, you consent to the practices described in this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Information We Collect</h2>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, contact details, cryptocurrency wallet addresses, and payment information.
              </li>
              <li>
                <strong>Transaction Data:</strong> Information regarding cryptocurrency transactions, investment amounts, and related blockchain data.
              </li>
              <li>
                <strong>Technical Data:</strong> IP addresses, browser types, access times, and website usage details.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">How We Use Your Information</h2>
            
            <p className="mb-4">We use your information to:</p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide and maintain our services.</li>
              <li>Process transactions and manage claims.</li>
              <li>Communicate updates, alerts, promotions, and support.</li>
              <li>Enhance website functionality and user experience.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Sharing Your Information</h2>
            
            <p className="mb-4">We do not sell your personal data. Information may be shared:</p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>With trusted third-party service providers who support our services.</li>
              <li>To comply with legal obligations, investigations, or legal requests.</li>
              <li>In connection with mergers, acquisitions, or corporate restructuring.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Data Security</h2>
            
            <p className="mb-6">
              We implement robust security measures to protect your personal information from unauthorized access, alteration, 
              disclosure, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Cookies</h2>
            
            <p className="mb-6">
              Our website may use cookies to improve your browsing experience, analyze website traffic, and understand visitor preferences. 
              You may disable cookies in your browser settings, but this may affect website functionality.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Third-Party Links</h2>
            
            <p className="mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Your Rights</h2>
            
            <p className="mb-6">
              You may access, update, correct, or delete your personal information. 
              Contact us at <a href="mailto:contact@apearmorsecure.com" className="text-apearmor-teal hover:underline">contact@apearmorsecure.com</a> for assistance.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Changes to this Privacy Policy</h2>
            
            <p className="mb-6">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date. 
              Your continued use of our website after any changes signifies your acceptance of the revised policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-apearmor-teal">Contact Us</h2>
            
            <p className="mb-6">
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            
            <p className="mb-8">
              Ape Armor Secure<br />
              <a href="mailto:contact@apearmorsecure.com" className="text-apearmor-teal hover:underline">contact@apearmorsecure.com</a>
            </p>
            
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
