
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PresaleFormValues } from "./PresaleForm";

interface WalletFieldProps {
  control: Control<PresaleFormValues>;
}

const WalletField = ({ control }: WalletFieldProps) => {
  return (
    <FormField
      control={control}
      name="walletAddress"
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

export default WalletField;
