
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import PaymentFormWrapper from "@/components/payment/PaymentFormWrapper";
import PaymentForm from "@/components/payment/PaymentForm";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "name" ? "username" : 
       id === "cardNumber" ? "walletAddress" : 
       id === "expiry" ? "datePaid" : 
       id === "amount" ? "amountPaid" :
       id === "signatureHash" ? "signatureHash" : id]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert payment record into Supabase
      const { error } = await supabase
        .from('payment_records')
        .insert({
          username: formData.username,
          wallet_address: formData.walletAddress,
          date_paid: formData.datePaid,
          amount_paid: formData.amountPaid,
          signature_hash: formData.signatureHash
        });
      
      if (error) throw error;
      
      toast({
        title: "Payment successful!",
        description: "Thank you for your payment. Your protection plan is now active.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Payment submission error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gradient-gold">Complete Your Payment</h1>
            <p className="text-muted-foreground">Enter your payment details to activate your protection plan</p>
          </div>
          
          <PaymentFormWrapper>
            <PaymentForm 
              formData={formData}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </PaymentFormWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
