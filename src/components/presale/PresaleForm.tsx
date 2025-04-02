
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  walletAddress: z.string().min(32, { message: "Please enter a valid wallet address" }),
  telegramUsername: z.string().optional(),
  xUsername: z.string().optional(),
  investmentAmount: z.string().min(1, { message: "Please enter a valid amount" }),
  reasonToParticipate: z.string().optional(),
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
      telegramUsername: "",
      xUsername: "",
      investmentAmount: "",
      reasonToParticipate: "",
    },
  });

  const onSubmit = async (data: PresaleFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Using a raw insert query to avoid type issues
      const { error } = await supabase.from('presale_applications').insert({
        name: data.name,
        email: data.email,
        wallet_address: data.walletAddress,
        telegram_username: data.telegramUsername || null,
        x_username: data.xUsername || null,
        investment_amount: data.investmentAmount,
        reason_to_participate: data.reasonToParticipate || null,
      } as any); // Using 'as any' to bypass type checking for now
      
      if (error) throw error;
      
      toast.success("Application submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
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
            <InvestmentField control={form.control} />
            <ReasonField control={form.control} />
            
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
