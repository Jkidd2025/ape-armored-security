
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PresaleFormValues } from "./PresaleForm";

interface InvestmentFieldProps {
  control: Control<PresaleFormValues>;
}

const InvestmentField = ({ control }: InvestmentFieldProps) => {
  return (
    <FormField
      control={control}
      name="investmentAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Intended Investment Amount (SOL)</FormLabel>
          <FormControl>
            <Input placeholder="e.g., 5" {...field} />
          </FormControl>
          <FormDescription>
            Enter the amount in SOL you intend to invest in the presale
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InvestmentField;
