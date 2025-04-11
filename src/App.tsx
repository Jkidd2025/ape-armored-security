
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import TermsOfService from "./pages/TermsOfService";
import Whitepaper from "./pages/Whitepaper";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ClaimSubmission from "./pages/ClaimSubmission";
import PresaleApplication from "./pages/PresaleApplication";
import SocialShareTest from "./pages/SocialShareTest";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Comprehensive whitepaper routes to catch all variations */}
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/whitepaper/" element={<Whitepaper />} />
          <Route path="whitepaper" element={<Whitepaper />} />
          <Route path="whitepaper/" element={<Whitepaper />} />
          
          {/* Catch-all redirect for whitepaper */}
          <Route path="*whitepaper*" element={<Navigate to="/whitepaper" replace />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/claim-submission" element={<ClaimSubmission />} />
          <Route path="/social-share-test" element={<SocialShareTest />} />
          
          {/* More comprehensive presale application routes */}
          <Route path="/presale-application" element={<PresaleApplication />} />
          <Route path="/presale-application/" element={<PresaleApplication />} />
          <Route path="presale-application" element={<PresaleApplication />} />
          <Route path="presale-application/" element={<PresaleApplication />} />
          
          {/* Catch-all redirect for presale */}
          <Route path="/presale" element={<Navigate to="/presale-application" replace />} />
          <Route path="presale" element={<Navigate to="/presale-application" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
