
import DisclaimerBox from "@/components/payment/DisclaimerBox";
import PaymentSubmitButton from "@/components/payment/PaymentSubmitButton";

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter = ({ isSubmitting }: FormFooterProps) => {
  return (
    <>
      <DisclaimerBox />
      <PaymentSubmitButton isSubmitting={isSubmitting} />
    </>
  );
};

export default FormFooter;
