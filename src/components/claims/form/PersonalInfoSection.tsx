
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

interface PersonalInfoProps {
  formData: {
    name: string;
    email: string;
    walletAddress: string;
    telegramUsername: string;
    xUsername: string;
  };
  formErrors: {
    name?: string;
    email?: string;
    walletAddress?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection = ({
  formData,
  formErrors,
  handleChange,
}: PersonalInfoProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={formErrors.name ? "border-red-500" : ""}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </FormItem>

        <FormItem>
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className={formErrors.email ? "border-red-500" : ""}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </FormItem>
      </div>

      <FormItem>
        <Label htmlFor="walletAddress">Wallet Address <span className="text-red-500">*</span></Label>
        <Input
          id="walletAddress"
          name="walletAddress"
          value={formData.walletAddress}
          onChange={handleChange}
          placeholder="Your wallet address"
          className={formErrors.walletAddress ? "border-red-500" : ""}
        />
        {formErrors.walletAddress && (
          <p className="text-red-500 text-sm mt-1">{formErrors.walletAddress}</p>
        )}
      </FormItem>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormItem>
          <Label htmlFor="telegramUsername">Telegram Username (Optional)</Label>
          <Input
            id="telegramUsername"
            name="telegramUsername"
            value={formData.telegramUsername}
            onChange={handleChange}
            placeholder="Your Telegram username"
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="xUsername">X Username (Optional)</Label>
          <Input
            id="xUsername"
            name="xUsername"
            value={formData.xUsername}
            onChange={handleChange}
            placeholder="Your X username"
          />
        </FormItem>
      </div>
    </div>
  );
};
