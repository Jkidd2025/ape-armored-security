
import React from "react";
import { ContactFormData } from "./ContactFormTypes";

interface SocialMediaFieldsProps {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  socialValidationError: string | null;
}

const SocialMediaFields = ({ 
  formData, 
  handleChange, 
  isSubmitting, 
  socialValidationError 
}: SocialMediaFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="telegramUsername" className="text-sm font-medium">
            Telegram Username
          </label>
          <input
            id="telegramUsername"
            name="telegramUsername"
            type="text"
            value={formData.telegramUsername}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal"
            placeholder="@yourusername"
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="xUsername" className="text-sm font-medium">
            X (Twitter) Username
          </label>
          <input
            id="xUsername"
            name="xUsername"
            type="text"
            value={formData.xUsername}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal"
            placeholder="@yourusername"
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      {socialValidationError && (
        <div className="text-destructive text-sm font-medium">
          {socialValidationError}
        </div>
      )}
    </>
  );
};

export default SocialMediaFields;
