
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import PaymentHeader from "@/components/payment/PaymentHeader";
import SubmitPaymentForm from "@/components/payment/SubmitPaymentForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserDetails {
  name?: string;
  email?: string;
  walletAddress?: string;
  packageType?: string;
}

const Payment = () => {
  const location = useLocation();
  const userDetails: UserDetails = location.state?.userDetails || {};
  
  const {
    formData,
    formErrors,
    isSubmitting,
    setIsSubmitting,
    setFormData,
    handleChange,
    handleSelectChange,
    validateForm
  } = usePaymentForm();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Pre-populate form fields if userDetails are available
    if (userDetails) {
      setFormData(prevData => ({
        ...prevData,
        username: userDetails.name || prevData.username,
        email: userDetails.email || prevData.email,
        walletAddress: userDetails.walletAddress || prevData.walletAddress,
        // Set paymentType based on package if applicable
        paymentType: userDetails.packageType ? 'registration' : prevData.paymentType
      }));
    }
  }, [userDetails, setFormData]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      <ScrollArea className="flex-1 h-[calc(100vh-64px)]">
        <main className="flex-1 pt-16">
          <div className="container max-w-4xl px-4 py-12 mb-16">
            <PaymentHeader 
              title="Complete Your Payment" 
              subtitle="Enter your payment details to activate your protection plan" 
            />
            
            <SubmitPaymentForm
              formData={formData}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              validateForm={validateForm}
            />
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default Payment;
