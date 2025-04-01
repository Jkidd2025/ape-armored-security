
import React from "react";
import { ContactFormData } from "./ContactFormTypes";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ReasonFieldProps {
  formData: ContactFormData;
  handleSelectChange: (value: string) => void;
  isSubmitting: boolean;
}

const ReasonField = ({ formData, handleSelectChange, isSubmitting }: ReasonFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="reason" className="text-sm font-medium">
        Reason for Contact
      </label>
      <Select
        disabled={isSubmitting}
        value={formData.reason}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger id="reason" className="w-full">
          <SelectValue placeholder="Select a reason for contact" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="General Support">General Support</SelectItem>
          <SelectItem value="Service Package Request">Service Package Request</SelectItem>
          <SelectItem value="Claim Help">Claim Help</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReasonField;
