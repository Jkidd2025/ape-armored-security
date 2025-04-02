
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  walletAddress: string;
  telegramUsername: string;
  xUsername: string;
  projectName: string;
  claimAmount: string;
  incidentDate: string;
  description: string;
  evidenceLinks: string;
}

interface FormErrors {
  name: string;
  email: string;
  walletAddress: string;
  projectName: string;
  claimAmount: string;
  incidentDate: string;
  description: string;
}

export const useClaimForm = (onSubmit: (formData: FormData) => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    walletAddress: "",
    telegramUsername: "",
    xUsername: "",
    projectName: "",
    claimAmount: "",
    incidentDate: "",
    description: "",
    evidenceLinks: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    walletAddress: "",
    projectName: "",
    claimAmount: "",
    incidentDate: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    // Simple validation for required fields
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.walletAddress) {
      newErrors.walletAddress = "Wallet address is required";
      isValid = false;
    }

    if (!formData.projectName) {
      newErrors.projectName = "Project name is required";
      isValid = false;
    }

    if (!formData.claimAmount) {
      newErrors.claimAmount = "Claim amount is required";
      isValid = false;
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = "Incident date is required";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return {
    formData,
    formErrors,
    handleChange,
    handleSubmit
  };
};
