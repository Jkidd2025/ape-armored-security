
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PaymentDetails {
  username: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
}

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  
  useEffect(() => {
    // Get payment details from location state
    if (location.state?.paymentDetails) {
      setPaymentDetails(location.state.paymentDetails);
    } else {
      // If no payment details are found, redirect to payment page
      navigate("/payment");
    }
  }, [location, navigate]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "The information has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <p>Loading payment details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container max-w-3xl px-4 py-12">
          <Card className="border-green-500 shadow-lg">
            <CardHeader className="bg-green-50 dark:bg-green-950/20 rounded-t-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl text-gradient-gold">Payment Successful!</CardTitle>
              <CardDescription className="text-center text-lg">
                Thank you for activating your ApeArmor protection plan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Payment Details</h3>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-1/3">Username</TableCell>
                        <TableCell className="w-2/3 flex justify-between items-center">
                          {paymentDetails.username}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyToClipboard(paymentDetails.username)}
                          >
                            <ClipboardCopy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Wallet Address</TableCell>
                        <TableCell className="flex justify-between items-center">
                          <span className="text-sm truncate max-w-[200px] md:max-w-[300px]">
                            {paymentDetails.walletAddress}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyToClipboard(paymentDetails.walletAddress)}
                          >
                            <ClipboardCopy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Date Paid</TableCell>
                        <TableCell>{paymentDetails.datePaid}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Amount Paid</TableCell>
                        <TableCell>{paymentDetails.amountPaid} USDC</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Transaction ID</TableCell>
                        <TableCell className="flex justify-between items-center">
                          <span className="text-sm truncate max-w-[200px] md:max-w-[300px]">
                            {paymentDetails.signatureHash}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyToClipboard(paymentDetails.signatureHash)}
                          >
                            <ClipboardCopy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    Your protection plan is now active. You will receive confirmation details at your provided contact information.
                    Please save these payment details for your records.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button 
                className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
                onClick={handleBackToHome}
              >
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentConfirmation;
