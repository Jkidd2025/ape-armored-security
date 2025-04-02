
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PresaleFormValues } from "./PresaleForm";

interface ReasonFieldProps {
  control: Control<PresaleFormValues>;
}

const ReasonField = ({ control }: ReasonFieldProps) => {
  return (
    <FormField
      control={control}
      name="reasonToParticipate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Why do you want to participate? (Optional)</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Tell us why you're interested in the ApeArmor presale"
              className="min-h-32"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReasonField;
