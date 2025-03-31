
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactInfoFields from "./ContactInfoFields";
import SocialMediaFields from "./SocialMediaFields";
import MessageField from "./MessageField";
import { ContactFormData } from "./ContactFormTypes";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    telegramUsername: "",
    xUsername: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialValidationError, setSocialValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear social validation error when user starts typing in either field
    if ((name === 'telegramUsername' || name === 'xUsername') && socialValidationError) {
      setSocialValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate that at least one social username is provided
      if (!formData.telegramUsername && !formData.xUsername) {
        setSocialValidationError("Please provide at least one username (Telegram or X)");
        setIsSubmitting(false);
        return;
      }

      // Clear social validation error if it exists
      setSocialValidationError(null);
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            telegram_username: formData.telegramUsername || null,
            x_username: formData.xUsername || null,
            message: formData.message
          }
        ]);
      
      if (error) {
        console.error("Error saving contact submission:", error);
        toast({
          title: "Error",
          description: "There was a problem submitting your message. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Form submitted to Supabase:", data);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        telegramUsername: "",
        xUsername: "",
        message: ""
      });
    } catch (err) {
      console.error("Exception when submitting form:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-apearmor-darkbronze">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ContactInfoFields 
            formData={formData} 
            handleChange={handleChange} 
            isSubmitting={isSubmitting} 
          />
          
          <SocialMediaFields 
            formData={formData} 
            handleChange={handleChange} 
            isSubmitting={isSubmitting} 
            socialValidationError={socialValidationError}
          />
          
          <MessageField 
            formData={formData} 
            handleChange={handleChange} 
            isSubmitting={isSubmitting} 
          />
          
          <Button 
            type="submit" 
            className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
            disabled={isSubmitting}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
