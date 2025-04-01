
import PaymentMethodSection from "@/components/payment/PaymentMethodSection";

interface PaymentSectionProps {
  signatureHash: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentSection = ({ signatureHash, error, onChange }: PaymentSectionProps) => {
  return (
    <PaymentMethodSection 
      signatureHash={signatureHash}
      error={error}
      onChange={onChange}
    />
  );
};

export default PaymentSection;
