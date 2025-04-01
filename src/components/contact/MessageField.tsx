
import React from "react";
import { ContactFormData } from "./ContactFormTypes";

interface MessageFieldProps {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
}

const MessageField = ({ formData, handleChange, isSubmitting }: MessageFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        value={formData.message || ""}
        onChange={handleChange}
        required
        rows={5}
        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal resize-none"
        placeholder="How can we help you?"
        disabled={isSubmitting}
      />
    </div>
  );
};

export default MessageField;
