
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/components/ui/form";

interface ClaimDetailsProps {
  formData: {
    projectName: string;
    claimAmount: string;
    incidentDate: string;
    description: string;
    evidenceLinks: string;
  };
  formErrors: {
    projectName?: string;
    claimAmount?: string;
    incidentDate?: string;
    description?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ClaimDetailsSection = ({
  formData,
  formErrors,
  handleChange,
}: ClaimDetailsProps) => {
  return (
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
  );
};
