
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface PaymentFormWrapperProps {
  children: ReactNode;
}

const PaymentFormWrapper = ({ children }: PaymentFormWrapperProps) => {
  return (
    <Card className="mx-auto max-w-2xl overflow-visible">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Complete the fields to apply payment towards your account</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Your payment information is securely processed
      </CardFooter>
    </Card>
  );
};

export default PaymentFormWrapper;
