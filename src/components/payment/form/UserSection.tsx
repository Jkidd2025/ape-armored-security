
import UserInfoInputs from "@/components/payment/UserInfoInputs";
import { useIsMobile } from "@/hooks/use-mobile";

interface UserSectionProps {
  username: string;
  email: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  paymentType: string;
  errors: {
    username: string;
    email: string;
    walletAddress: string;
    datePaid: string;
    amountPaid: string;
    paymentType: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, name: string) => void;
}

const UserSection = ({
  username, 
  email, 
  walletAddress, 
  datePaid, 
  amountPaid, 
  paymentType,
  errors, 
  onChange,
  onSelectChange 
}: UserSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
      <UserInfoInputs 
        username={username}
        email={email}
        walletAddress={walletAddress}
        datePaid={datePaid}
        amountPaid={amountPaid}
        paymentType={paymentType}
        errors={errors}
        onChange={onChange}
        onSelectChange={onSelectChange}
      />
    </div>
  );
};

export default UserSection;
