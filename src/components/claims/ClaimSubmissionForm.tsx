
import { Separator } from "@/components/ui/separator";
import { PersonalInfoSection } from "./form/PersonalInfoSection";
import { ClaimDetailsSection } from "./form/ClaimDetailsSection";
import { FormActions } from "./form/FormActions";
import { useClaimForm } from "./form/useClaimForm";

interface ClaimSubmissionFormProps {
  onSubmit: (formData: {
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
  }) => void;
  isSubmitting: boolean;
}

const ClaimSubmissionForm = ({ onSubmit, isSubmitting }: ClaimSubmissionFormProps) => {
  const { formData, formErrors, handleChange, handleSubmit } = useClaimForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoSection 
        formData={formData} 
        formErrors={formErrors} 
        handleChange={handleChange} 
      />

      <Separator />

      <ClaimDetailsSection 
        formData={formData} 
        formErrors={formErrors} 
        handleChange={handleChange} 
      />

      <FormActions isSubmitting={isSubmitting} />
    </form>
  );
};

export default ClaimSubmissionForm;
