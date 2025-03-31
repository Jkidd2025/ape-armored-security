
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "./SignUpForm";

interface WalletAddressFieldProps {
  control: Control<FormData>;
}

const WalletAddressField = ({ control }: WalletAddressFieldProps) => {
  return (
    <FormField
      control={control}
      name="walletAddress"
      rules={{ required: "Wallet address is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Wallet Address</FormLabel>
          <FormControl>
            <Input placeholder="Enter your wallet address" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WalletAddressField;
