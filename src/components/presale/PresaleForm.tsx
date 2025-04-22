
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
  presaleRound: z.literal("round3", { message: "Please select Round 3" }),
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
  const [debugInfo, setDebugInfo] = React.useState<string | null>(null);
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
    setDebugInfo(null);
    
    try {
      console.log("Submitting application data:", data);
      
      // Show loading toast
      const loadingToast = toast.loading("Submitting your application...");
      
      // Explicitly map form fields to database column names
      const payload = {
        name: data.name,
        email: data.email,
        wallet_address: data.walletAddress,
        presale_round: data.presaleRound,
        telegram_username: data.telegramUsername || null,
        x_username: data.xUsername || null,
        investment_amount: data.investmentAmount,
        reason_to_participate: data.reasonToParticipate || null,
        status: 'pending'
      };
      
      console.log("Sending payload to Supabase:", payload);
      
      // Try to insert data with select() to get the response
      const { data: insertedData, error } = await supabase
        .from('presale_applications')
        .insert(payload)
        .select();
      
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (error) {
        console.error("Supabase error:", error);
        // Set debug info for development
        setDebugInfo(JSON.stringify({
          error: error,
          payload: payload
        }, null, 2));
        
        // Show a more detailed error message
        if (error.code === '42501' || error.message.includes('policy')) {
          toast.error("Submission error: Insufficient permissions. Please contact support.");
        } else {
          toast.error(`Submission error: ${error.message}`);
        }
        
        throw error;
      }
      
      console.log("Successful insert, returned data:", insertedData);
      toast.success("Application submitted successfully! We'll review your application and contact you soon.");
      
      // Clear form and redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
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
            
            {debugInfo && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mt-4 overflow-auto max-h-60">
                <h4 className="text-sm font-semibold text-yellow-800 mb-2">Debug Information (Development Only):</h4>
                <pre className="text-xs text-yellow-700">{debugInfo}</pre>
              </div>
            )}
            
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
                className="relative"
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Submit Application</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </>
                ) : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PresaleForm;
