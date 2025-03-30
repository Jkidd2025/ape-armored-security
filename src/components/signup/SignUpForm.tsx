
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TermsAndConditions from "./TermsAndConditions";

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
};

const SignUpForm = ({ selectedPackage, onSubmit, onBack }: SignUpFormProps) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="telegramUsername"
            rules={{ required: "Telegram username is required" }}
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
            control={form.control}
            name="xUsername"
            rules={{ required: "X (Twitter) username is required" }}
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

        <FormField
          control={form.control}
          name="walletAddress"
          rules={{ required: "Wallet address is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your wallet address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </TermsAndConditions>

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10"
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            type="submit" 
            className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
          >
            Complete Signup
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
