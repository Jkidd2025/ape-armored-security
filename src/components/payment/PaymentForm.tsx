
import { FormEvent } from "react";
import UserSection from "./form/UserSection";
import PaymentSection from "./form/PaymentSection";
import FormFooter from "./form/FormFooter";

interface FormData {
  username: string;
  email: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
  paymentType: string;
}

interface FormErrors {
  username: string;
  email: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
  paymentType: string;
}

interface PaymentFormProps {
  formData: FormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PaymentForm = ({ 
  formData, 
  formErrors, 
  isSubmitting, 
  handleChange,
  handleSelectChange,
  handleSubmit 
}: PaymentFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserSection 
        username={formData.username}
        email={formData.email}
        walletAddress={formData.walletAddress}
        datePaid={formData.datePaid}
        amountPaid={formData.amountPaid}
        paymentType={formData.paymentType}
        errors={{
          username: formErrors.username,
          email: formErrors.email,
          walletAddress: formErrors.walletAddress,
          datePaid: formErrors.datePaid,
          amountPaid: formErrors.amountPaid,
          paymentType: formErrors.paymentType
        }}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
      />
      
      <PaymentSection 
        signatureHash={formData.signatureHash}
        error={formErrors.signatureHash}
        onChange={handleChange}
      />
      
      <FormFooter isSubmitting={isSubmitting} />
    </form>
  );
};

export default PaymentForm;
