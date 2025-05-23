
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserInfoInputsProps {
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

const UserInfoInputs = ({ 
  username, 
  email, 
  walletAddress, 
  datePaid, 
  amountPaid, 
  paymentType,
  errors, 
  onChange,
  onSelectChange 
}: UserInfoInputsProps) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="username">Telegram Username or X Username</Label>
        <Input 
          id="username" 
          placeholder="Enter your username (e.g., @username)" 
          required 
          value={username}
          onChange={onChange}
          className={errors.username ? "border-red-500" : ""}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email"
          placeholder="Enter your email address" 
          required 
          value={email}
          onChange={onChange}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="walletAddress">Payment From Wallet Address</Label>
        <div className="relative">
          <Input 
            id="walletAddress" 
            placeholder="Enter your wallet address" 
            required 
            className={`pl-10 ${errors.walletAddress ? "border-red-500" : ""}`}
            value={walletAddress}
            onChange={onChange}
          />
          <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        {errors.walletAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="datePaid">Date Paid</Label>
          <Input 
            id="datePaid" 
            name="datePaid" 
            placeholder="MM/DD/YY" 
            required 
            value={datePaid}
            onChange={onChange}
            className={errors.datePaid ? "border-red-500" : ""}
            autoComplete="off"
          />
          {errors.datePaid && (
            <p className="text-red-500 text-sm mt-1">{errors.datePaid}</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-2">
          <Label htmlFor="amountPaid">Amount Paid</Label>
          <Input 
            id="amountPaid" 
            name="amountPaid" 
            placeholder="Enter amount in USDC" 
            required 
            value={amountPaid}
            onChange={onChange}
            className={errors.amountPaid ? "border-red-500" : ""}
            autoComplete="off"
          />
          {errors.amountPaid && (
            <p className="text-red-500 text-sm mt-1">{errors.amountPaid}</p>
        )}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="paymentType">Payment Type</Label>
        <Select 
          value={paymentType} 
          onValueChange={(value) => onSelectChange(value, "paymentType")}
        >
          <SelectTrigger id="paymentType" className={errors.paymentType ? "border-red-500" : ""}>
            <SelectValue placeholder="Select payment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Monthly Payment for Service Package</SelectItem>
            <SelectItem value="setup">Account Set Up Fee</SelectItem>
            <SelectItem value="registration">Project Registration</SelectItem>
          </SelectContent>
        </Select>
        {errors.paymentType && (
          <p className="text-red-500 text-sm mt-1">{errors.paymentType}</p>
        )}
      </div>
    </>
  );
};

export default UserInfoInputs;
