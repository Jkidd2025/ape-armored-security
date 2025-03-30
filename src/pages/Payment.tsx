
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    try {
      // In a real implementation, this would connect to a payment gateway
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment successful!",
        description: "Thank you for your payment. Your protection plan is now active.",
      });
      
      navigate("/");
    } catch (error) {
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
                  <Input id="name" placeholder="Enter your username (e.g., @username)" required />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="cardNumber">Payment From Wallet Address</Label>
                  <div className="relative">
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      required 
                      className="pl-10"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="expiry">Date Paid</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                
                <div className="border-t pt-4">
                  <Label className="mb-2 block">Payment Method</Label>
                  <RadioGroup defaultValue="card" className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex items-center cursor-pointer">
                        <Wallet className="mr-2 h-4 w-4" />
                        Crypto
                      </Label>
                    </div>
                  </RadioGroup>
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
