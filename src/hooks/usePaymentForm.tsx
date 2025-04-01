
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
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: "",
    paymentType: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: "",
    email: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: "",
    paymentType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when field is edited
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: "",
      email: "",
      walletAddress: "",
      datePaid: "",
      amountPaid: "",
      signatureHash: "",
      paymentType: "",
    };
    let isValid = true;

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Wallet address validation
    if (!formData.walletAddress) {
      newErrors.walletAddress = "Wallet address is required";
      isValid = false;
    } else if (formData.walletAddress.length < 32) {
      newErrors.walletAddress = "Wallet address should be at least 32 characters";
      isValid = false;
    }

    // Date paid validation
    if (!formData.datePaid) {
      newErrors.datePaid = "Date paid is required";
      isValid = false;
    }

    // Amount paid validation
    if (!formData.amountPaid) {
      newErrors.amountPaid = "Amount paid is required";
      isValid = false;
    } else if (isNaN(Number(formData.amountPaid)) || Number(formData.amountPaid) <= 0) {
      newErrors.amountPaid = "Amount paid must be a positive number";
      isValid = false;
    }

    // Signature hash validation
    if (!formData.signatureHash) {
      newErrors.signatureHash = "Signature hash is required";
      isValid = false;
    } else if (formData.signatureHash.length < 32) {
      newErrors.signatureHash = "Signature hash should be at least 32 characters";
      isValid = false;
    }

    // Payment type validation
    if (!formData.paymentType) {
      newErrors.paymentType = "Payment type is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    setIsSubmitting,
    setFormData,
    handleChange,
    handleSelectChange,
    validateForm,
  };
};
