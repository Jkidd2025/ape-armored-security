
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageSelection from "@/components/signup/PackageSelection";
import ProgressSteps from "@/components/signup/ProgressSteps";
import SignUpForm, { FormData } from "@/components/signup/SignUpForm";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  {
    title: "Select Your Package",
    description: "Choose the protection level that fits your needs"
  },
  {
    title: "Complete Your Information",
    description: "Provide your details to finalize your protection plan"
  }
];

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setStep(2);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);

    // At least one of telegramUsername or xUsername should be provided
    if (!data.telegramUsername && !data.xUsername) {
      toast({
        title: "Validation Error",
        description: "At least one social media username (Telegram or X) is required.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Store the registration data in Supabase
      const { error } = await supabase
        .from('user_registrations')
        .insert([
          { 
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            telegram_username: data.telegramUsername || null, // Allow null
            x_username: data.xUsername || null, // Allow null
            wallet_address: data.walletAddress,
            package_type: data.packageType
          }
        ]);

      if (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Sign-up failed",
          description: error.message || "There was an error processing your sign-up. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign-up successful!",
          description: `You have successfully signed up for the ${data.packageType} package.`,
        });
        // Redirect to home after successful sign-up
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Sign-up failed",
        description: "There was an error processing your sign-up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToPackages = () => {
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PackageSelection selectedPackage={selectedPackage} onPackageSelect={handlePackageSelect} />;
      case 2:
        return <SignUpForm selectedPackage={selectedPackage} onSubmit={onSubmit} onBack={handleBackToPackages} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gradient-gold">Armor Up Your Crypto</h1>
            <p className="text-muted-foreground">Choose your protection package and complete the sign-up process</p>
          </div>
          
          <ProgressSteps currentStep={step} steps={steps} />
          
          {renderStepContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
