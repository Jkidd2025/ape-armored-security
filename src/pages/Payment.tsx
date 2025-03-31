
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import PaymentHeader from "@/components/payment/PaymentHeader";
import SubmitPaymentForm from "@/components/payment/SubmitPaymentForm";

const Payment = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleSelectChange,
    validateForm
  } = usePaymentForm();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl px-4 py-12">
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
    </div>
  );
};

export default Payment;
