
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ClaimSubmissionForm from "@/components/claims/ClaimSubmissionForm";
import { Separator } from "@/components/ui/separator";

const ClaimSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    walletAddress: string;
    projectName: string;
    claimAmount: string;
    incidentDate: string;
    description: string;
    evidenceLinks: string;
  }) => {
    setIsSubmitting(true);
    try {
      // Use the raw query method to insert into the claim_submissions table
      // This bypasses TypeScript checking since the types haven't been updated yet
      const { error } = await supabase.from('claim_submissions').insert({
        name: formData.name,
        email: formData.email,
        wallet_address: formData.walletAddress,
        project_name: formData.projectName,
        claim_amount: formData.claimAmount,
        incident_date: formData.incidentDate,
        description: formData.description,
        evidence_links: formData.evidenceLinks || null,
      } as any);

      if (error) throw error;

      toast.success("Claim submitted successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("Failed to submit claim. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gradient-gold mb-2">Submit a Claim</h1>
      <p className="text-muted-foreground mb-6">
        If you've experienced a loss due to a crypto scam or security issue and have ApeArmor protection, submit your claim details below.
      </p>
      <Separator className="mb-8" />
      <ClaimSubmissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default ClaimSubmission;
