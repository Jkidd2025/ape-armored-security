
import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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
    <section id="contact" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Have questions or need assistance? We're here to help!
          </p>
          <Separator className="w-20 h-1 bg-apearmor-teal my-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card className="border-apearmor-darkbronze">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal"
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal"
                        placeholder="Your email"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
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
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-apearmor-teal resize-none"
                      placeholder="How can we help you?"
                      disabled={isSubmitting}
                    />
                  </div>
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
          </div>
          
          <div>
            <Card className="border-apearmor-darkbronze h-full">
              <CardContent className="p-6 flex flex-col space-y-6">
                <h3 className="text-xl font-semibold">Get in Touch</h3>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-apearmor-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">support@apearmor.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-apearmor-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-apearmor-teal transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
