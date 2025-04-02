
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2 } from "lucide-react";

interface ClaimSubmissionFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    walletAddress: string;
    projectName: string;
    claimAmount: string;
    incidentDate: string;
    description: string;
    evidenceLinks: string;
  }) => void;
  isSubmitting: boolean;
}

const ClaimSubmissionForm = ({ onSubmit, isSubmitting }: ClaimSubmissionFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
    projectName: "",
    claimAmount: "",
    incidentDate: "",
    description: "",
    evidenceLinks: "",
  });

  const [formErrors, setFormErrors] = useState({
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem>
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={formErrors.name ? "border-red-500" : ""}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className={formErrors.email ? "border-red-500" : ""}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </FormItem>
        </div>

        <FormItem>
          <Label htmlFor="walletAddress">Wallet Address <span className="text-red-500">*</span></Label>
          <Input
            id="walletAddress"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            placeholder="Your wallet address"
            className={formErrors.walletAddress ? "border-red-500" : ""}
          />
          {formErrors.walletAddress && (
            <p className="text-red-500 text-sm mt-1">{formErrors.walletAddress}</p>
          )}
        </FormItem>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Claim Details</h2>
        
        <FormItem>
          <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
          <Input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Name of the project related to your claim"
            className={formErrors.projectName ? "border-red-500" : ""}
          />
          {formErrors.projectName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.projectName}</p>
          )}
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem>
            <Label htmlFor="claimAmount">Claim Amount <span className="text-red-500">*</span></Label>
            <Input
              id="claimAmount"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              placeholder="Amount in USD or tokens"
              className={formErrors.claimAmount ? "border-red-500" : ""}
            />
            {formErrors.claimAmount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.claimAmount}</p>
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="incidentDate">Incident Date <span className="text-red-500">*</span></Label>
            <Input
              id="incidentDate"
              name="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={handleChange}
              className={formErrors.incidentDate ? "border-red-500" : ""}
            />
            {formErrors.incidentDate && (
              <p className="text-red-500 text-sm mt-1">{formErrors.incidentDate}</p>
            )}
          </FormItem>
        </div>

        <FormItem>
          <Label htmlFor="description">
            Description of Incident <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about what happened"
            rows={5}
            className={formErrors.description ? "border-red-500" : ""}
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
          )}
        </FormItem>

        <FormItem>
          <Label htmlFor="evidenceLinks">
            Evidence Links (Optional)
          </Label>
          <Textarea
            id="evidenceLinks"
            name="evidenceLinks"
            value={formData.evidenceLinks}
            onChange={handleChange}
            placeholder="Links to any evidence (transactions, screenshots, etc.) - one per line"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Provide links to transaction hashes, screenshots, or other evidence
          </p>
        </FormItem>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full md:w-auto" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Claim
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ClaimSubmissionForm;
