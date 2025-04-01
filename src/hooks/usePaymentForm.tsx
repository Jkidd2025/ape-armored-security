
import { useState } from "react";

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

export const usePaymentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: "",
    paymentType: ""
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: "",
    email: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: "",
    paymentType: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "name" ? "username" : 
       id === "email" ? "email" :
       id === "cardNumber" ? "walletAddress" : 
       id === "expiry" ? "datePaid" : 
       id === "amount" ? "amountPaid" :
       id === "signatureHash" ? "signatureHash" : id]: value
    }));
    
    if (formErrors[id === "name" ? "username" : 
        id === "email" ? "email" :
        id === "cardNumber" ? "walletAddress" : 
        id === "expiry" ? "datePaid" : 
        id === "amount" ? "amountPaid" :
        id === "signatureHash" ? "signatureHash" : id as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [id === "name" ? "username" : 
         id === "email" ? "email" :
         id === "cardNumber" ? "walletAddress" : 
         id === "expiry" ? "datePaid" : 
         id === "amount" ? "amountPaid" :
         id === "signatureHash" ? "signatureHash" : id]: ""
      }));
    }
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const errors = { ...formErrors };
    
    if (!formData.username.includes('@')) {
      errors.username = "Username must include @ symbol";
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    // Updated validation for Solana wallet address
    if (!formData.walletAddress || formData.walletAddress.length < 32) {
      errors.walletAddress = "Please enter a valid Solana wallet address";
      isValid = false;
    }
    
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
    if (!dateRegex.test(formData.datePaid)) {
      errors.datePaid = "Date must be in MM/DD/YY format";
      isValid = false;
    }
    
    if (isNaN(parseFloat(formData.amountPaid))) {
      errors.amountPaid = "Amount must be a number";
      isValid = false;
    }
    
    if (!formData.signatureHash.trim()) {
      errors.signatureHash = "Signature hash is required";
      isValid = false;
    }
    
    if (!formData.paymentType) {
      errors.paymentType = "Payment type is required";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleSelectChange,
    validateForm
  };
};
