
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";

interface UserInfoInputsProps {
  username: string;
  walletAddress: string;
  datePaid: string;
  amountPaid: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfoInputs = ({ username, walletAddress, datePaid, amountPaid, onChange }: UserInfoInputsProps) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Telegram Username or X Username</Label>
        <Input 
          id="name" 
          placeholder="Enter your username (e.g., @username)" 
          required 
          value={username}
          onChange={onChange}
        />
      </div>
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="cardNumber">Payment From Wallet Address</Label>
        <div className="relative">
          <Input 
            id="cardNumber" 
            placeholder="1234 5678 9012 3456" 
            required 
            className="pl-10"
            value={walletAddress}
            onChange={onChange}
          />
          <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="expiry">Date Paid</Label>
          <Input 
            id="expiry" 
            placeholder="MM/DD/YY" 
            required 
            value={datePaid}
            onChange={onChange}
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="amount">Amount Paid</Label>
          <Input 
            id="amount" 
            placeholder="Enter amount in USDC" 
            required 
            value={amountPaid}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default UserInfoInputs;
