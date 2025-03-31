
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PaymentFormWrapper from "./PaymentFormWrapper";
import PaymentForm from "./PaymentForm";

interface FormData {
  username: string;
  email: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
  paymentType: string;
}

interface FormErrors {
  username: string;
  email: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
  paymentType: string;
}

interface SubmitPaymentFormProps {
  formData: FormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  validateForm: () => boolean;
}

const SubmitPaymentForm = ({
  formData,
  formErrors,
  isSubmitting,
  setIsSubmitting,
  handleChange,
  handleSelectChange,
  validateForm
}: SubmitPaymentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('payment_records')
        .insert({
          username: formData.username,
          wallet_address: formData.walletAddress,
          date_paid: formData.datePaid,
          amount_paid: formData.amountPaid,
          signature_hash: formData.signatureHash,
          email: formData.email,
          payment_type: formData.paymentType
        });
      
      if (error) throw error;
      
      toast({
        title: "Payment successful!",
        description: "Thank you for your payment. Your protection plan is now active.",
      });
      
      navigate("/payment-confirmation", { 
        state: { 
          paymentDetails: formData 
        } 
      });
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
    <PaymentFormWrapper>
      <PaymentForm 
        formData={formData}
        formErrors={formErrors}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
      />
    </PaymentFormWrapper>
  );
};

export default SubmitPaymentForm;
