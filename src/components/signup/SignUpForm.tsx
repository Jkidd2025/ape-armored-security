
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import TermsAndConditions from "./TermsAndConditions";
import PersonalInfoFields from "./PersonalInfoFields";
import SocialMediaFields from "./SocialMediaFields";
import WalletAddressField from "./WalletAddressField";
import FormActions from "./FormActions";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  telegramUsername: string;
  xUsername: string;
  walletAddress: string;
  packageType: string;
  agreeTerms: boolean;
};

type SignUpFormProps = {
  selectedPackage: string | null;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  isSubmitting?: boolean;
};

const SignUpForm = ({ selectedPackage, onSubmit, onBack, isSubmitting = false }: SignUpFormProps) => {
  const [socialValidationError, setSocialValidationError] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      telegramUsername: "",
      xUsername: "",
      walletAddress: "",
      packageType: selectedPackage || "",
      agreeTerms: false,
    },
  });

  useEffect(() => {
    if (selectedPackage) {
      form.setValue("packageType", selectedPackage);
    }
  }, [selectedPackage, form]);

  const handleSubmit = (data: FormData) => {
    // Check if at least one social username is provided
    if (!data.telegramUsername && !data.xUsername) {
      setSocialValidationError("At least one username (Telegram or X) is required");
      return;
    }
    
    // Clear validation error if it exists
    setSocialValidationError(null);
    
    // Continue with form submission
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PersonalInfoFields control={form.control} />
        
        <SocialMediaFields 
          control={form.control}
          socialValidationError={socialValidationError}
        />

        <WalletAddressField control={form.control} />

        <TermsAndConditions>
          <FormField
            control={form.control}
            name="agreeTerms"
            rules={{ required: "You must agree to the terms and conditions" }}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the terms and conditions
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </TermsAndConditions>

        <FormActions onBack={onBack} isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default SignUpForm;
