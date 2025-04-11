
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PresaleFormValues } from "./PresaleForm";

interface PresaleRoundFieldProps {
  control: Control<PresaleFormValues>;
}

const PresaleRoundField = ({ control }: PresaleRoundFieldProps) => {
  return (
    <FormField
      control={control}
      name="presaleRound"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Presale Round</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select presale round" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="round2">Round 2</SelectItem>
              <SelectItem value="round3">Round 3</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PresaleRoundField;
