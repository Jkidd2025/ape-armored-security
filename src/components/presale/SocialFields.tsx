
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PresaleFormValues } from "./PresaleForm";

interface SocialFieldsProps {
  control: Control<PresaleFormValues>;
}

const SocialFields = ({ control }: SocialFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="telegramUsername"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram Username</FormLabel>
            <FormControl>
              <Input placeholder="@yourusername" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="xUsername"
        render={({ field }) => (
          <FormItem>
            <FormLabel>X (Twitter) Username</FormLabel>
            <FormControl>
              <Input placeholder="@yourusername" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SocialFields;
