
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import TermsOfService from "./pages/TermsOfService";
import Whitepaper from "./pages/Whitepaper";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ClaimSubmission from "./pages/ClaimSubmission";
import SocialShareTest from "./pages/SocialShareTest";
import ApeWire from "./pages/ApeWire";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import Swap from "./pages/Swap";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/swap" element={<Swap />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                <Route path="/whitepaper" element={<Whitepaper />} />
                <Route path="/whitepaper/" element={<Whitepaper />} />
                <Route path="whitepaper" element={<Whitepaper />} />
                <Route path="whitepaper/" element={<Whitepaper />} />
                
                <Route path="*whitepaper*" element={<Navigate to="/whitepaper" replace />} />
                
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/claim-submission" element={<ClaimSubmission />} />
                <Route path="/social-share-test" element={<SocialShareTest />} />
                
                <Route path="/ape-wire" element={<ApeWire />} />
                <Route path="/ape-wire/:slug" element={<BlogPost />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </TooltipProvider>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
