
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

interface PaymentFormProps {
  formData: FormData;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PaymentForm = ({ formData, isSubmitting, handleChange, handleSubmit }: PaymentFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserInfoInputs 
        username={formData.username}
        walletAddress={formData.walletAddress}
        datePaid={formData.datePaid}
        amountPaid={formData.amountPaid}
        onChange={handleChange}
      />
      
      <PaymentMethodSection 
        signatureHash={formData.signatureHash}
        onChange={handleChange}
      />
      
      <DisclaimerBox />
      
      <PaymentSubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default PaymentForm;
