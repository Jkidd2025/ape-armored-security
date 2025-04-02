
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  walletAddress: z.string().min(32, { message: "Please enter a valid wallet address" }),
  telegramUsername: z.string().optional(),
  xUsername: z.string().optional(),
  investmentAmount: z.string().min(1, { message: "Please enter a valid amount" }),
  reasonToParticipate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PresaleApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
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

  const onSubmit = async (data: FormValues) => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gradient-gold">Presale Application</h1>
          
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
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
                  
                  <FormField
                    control={form.control}
                    name="investmentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intended Investment Amount (USDC)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the amount in USDC you intend to invest in the presale
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PresaleApplication;
