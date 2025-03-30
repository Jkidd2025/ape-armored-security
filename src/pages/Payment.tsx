
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ExternalLink, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    walletAddress: "",
    datePaid: "",
    amountPaid: "",
    signatureHash: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "name" ? "username" : 
       id === "cardNumber" ? "walletAddress" : 
       id === "expiry" ? "datePaid" : 
       id === "amount" ? "amountPaid" :
       id === "signatureHash" ? "signatureHash" : id]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert payment record into Supabase
      const { error } = await supabase
        .from('payment_records')
        .insert({
          username: formData.username,
          wallet_address: formData.walletAddress,
          date_paid: formData.datePaid,
          amount_paid: formData.amountPaid,
          signature_hash: formData.signatureHash
        });
      
      if (error) throw error;
      
      toast({
        title: "Payment successful!",
        description: "Thank you for your payment. Your protection plan is now active.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Payment submission error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gradient-gold">Complete Your Payment</h1>
            <p className="text-muted-foreground">Enter your payment details to activate your protection plan</p>
          </div>
          
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete the fields to apply payment towards your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Telegram Username or X Username</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your username (e.g., @username)" 
                    required 
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="cardNumber">Payment From Wallet Address</Label>
                  <div className="relative">
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      required 
                      className="pl-10"
                      value={formData.walletAddress}
                      onChange={handleChange}
                    />
                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="expiry">Date Paid</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/DD/YY" 
                      required 
                      value={formData.datePaid}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="amount">Amount Paid</Label>
                    <Input 
                      id="amount" 
                      placeholder="Enter amount in USDC" 
                      required 
                      value={formData.amountPaid}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <Label className="mb-2 block">Payment Method</Label>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <Coins className="mr-2 h-4 w-4" />
                      <span>USDC Only</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="paymentAddress">Payment To Wallet Address</Label>
                      <div className="relative">
                        <Input 
                          id="paymentAddress" 
                          value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                          readOnly
                          className="pl-10 bg-gray-50"
                        />
                        <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Send USDC to this wallet address to complete your payment</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="signatureHash">Signature Hash</Label>
                      <Input 
                        id="signatureHash" 
                        placeholder="Enter transaction signature hash" 
                        required
                        value={formData.signatureHash}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter the signature hash of your transaction for verification - it can be found on Solscan - 
                        <a 
                          href="https://solscan.io/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-apearmor-teal hover:underline inline-flex items-center ml-1"
                        >
                          Solscan Check Here
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Complete Payment"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              Your payment information is securely processed
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
