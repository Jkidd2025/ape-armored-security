
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "./SignUpForm";

interface SocialMediaFieldsProps {
  control: Control<FormData>;
  socialValidationError: string | null;
}

const SocialMediaFields = ({ control, socialValidationError }: SocialMediaFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      {/* Display custom validation error for social usernames */}
      {socialValidationError && (
        <div className="text-destructive text-sm font-medium">
          {socialValidationError}
        </div>
      )}
    </>
  );
};

export default SocialMediaFields;
