
import { FormEvent } from "react";
import UserInfoInputs from "./UserInfoInputs";
import PaymentMethodSection from "./PaymentMethodSection";
import DisclaimerBox from "./DisclaimerBox";
import PaymentSubmitButton from "./PaymentSubmitButton";

interface FormData {
  username: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
}

interface FormErrors {
  username: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  signatureHash: string;
}

interface PaymentFormProps {
  formData: FormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PaymentForm = ({ 
  formData, 
  formErrors, 
  isSubmitting, 
  handleChange, 
  handleSubmit 
}: PaymentFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserInfoInputs 
        username={formData.username}
        walletAddress={formData.walletAddress}
        datePaid={formData.datePaid}
        amountPaid={formData.amountPaid}
        errors={{
          username: formErrors.username,
          walletAddress: formErrors.walletAddress,
          datePaid: formErrors.datePaid,
          amountPaid: formErrors.amountPaid
        }}
        onChange={handleChange}
      />
      
      <PaymentMethodSection 
        signatureHash={formData.signatureHash}
        error={formErrors.signatureHash}
        onChange={handleChange}
      />
      
      <DisclaimerBox />
      
      <PaymentSubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default PaymentForm;
