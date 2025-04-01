
import UserInfoInputs from "@/components/payment/UserInfoInputs";

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
  return (
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
  );
};

export default UserSection;
