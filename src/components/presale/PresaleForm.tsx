
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import PersonalInfoFields from "./PersonalInfoFields";
import SocialFields from "./SocialFields";
import WalletField from "./WalletField";
import InvestmentField from "./InvestmentField";
import ReasonField from "./ReasonField";
import PresaleRoundField from "./PresaleRoundField";
import TermsDisclaimer from "./TermsDisclaimer";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  walletAddress: z.string().min(32, { message: "Please enter a valid wallet address" }),
  presaleRound: z.string().min(1, { message: "Please select a presale round" }),
  telegramUsername: z.string().optional(),
  xUsername: z.string().optional(),
  investmentAmount: z.string().min(1, { message: "Please enter a valid amount" }),
  reasonToParticipate: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type PresaleFormValues = z.infer<typeof formSchema>;

const PresaleForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  
  const form = useForm<PresaleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      walletAddress: "",
      presaleRound: "",
      telegramUsername: "",
      xUsername: "",
      investmentAmount: "",
      reasonToParticipate: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: PresaleFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting application data:", data);
      
      // Explicitly map form fields to database column names
      const { data: insertedData, error } = await supabase.from('presale_applications').insert({
        name: data.name,
        email: data.email,
        wallet_address: data.walletAddress,
        presale_round: data.presaleRound,
        telegram_username: data.telegramUsername || null,
        x_username: data.xUsername || null,
        investment_amount: data.investmentAmount,
        reason_to_participate: data.reasonToParticipate || null,
        status: 'pending'
      }).select();
      
      if (error) {
        console.error("Supabase error:", error);
        toast.error(`Submission error: ${error.message}`);
        throw error;
      }
      
      console.log("Successful insert, returned data:", insertedData);
      toast.success("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting application:", error);
      if (error instanceof Error) {
        toast.error(`Failed to submit application: ${error.message}`);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card border-apearmor-darkbronze">
      <CardHeader>
        <CardTitle>Apply for ApeArmor Presale</CardTitle>
        <CardDescription>
          Fill out this form to participate in our upcoming token presale. Limited spots available.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialFields control={form.control} />
            </div>
            
            <WalletField control={form.control} />
            <PresaleRoundField control={form.control} />
            <InvestmentField control={form.control} />
            <ReasonField control={form.control} />
            <TermsDisclaimer control={form.control} />
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PresaleForm;
