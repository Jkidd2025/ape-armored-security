
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageSelection from "@/components/signup/PackageSelection";
import ProgressSteps from "@/components/signup/ProgressSteps";
import SignUpForm, { FormData } from "@/components/signup/SignUpForm";

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

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setStep(2);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Sign-up successful!",
      description: `You have successfully signed up for the ${data.packageType} package.`,
    });
    navigate("/");
  };

  const handleBackToPackages = () => {
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <PackageSelection selectedPackage={selectedPackage} onPackageSelect={handlePackageSelect} />;
      case 2:
        return <SignUpForm selectedPackage={selectedPackage} onSubmit={onSubmit} onBack={handleBackToPackages} />;
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
