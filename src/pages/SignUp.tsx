
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, BadgeCheck, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const packages = [
  {
    id: "chimp",
    name: "Chimp",
    subtitle: "Basic Protection",
    icon: <Shield className="h-10 w-10" />,
    price: "5",
    interval: "/day",
    currency: "$",
  },
  {
    id: "gorilla",
    name: "Gorilla",
    subtitle: "Advanced Protection",
    icon: <BadgeCheck className="h-10 w-10" />,
    price: "10",
    currency: "$",
    interval: "/day",
  },
  {
    id: "silverback",
    name: "Silverback",
    subtitle: "Premium Protection",
    icon: <Rocket className="h-10 w-10" />,
    price: "20",
    currency: "$",
    interval: "/day",
  },
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  telegramUsername: string;
  xUsername: string;
  walletAddress: string;
  packageType: string;
  agreeTerms: boolean;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      telegramUsername: "",
      xUsername: "",
      walletAddress: "",
      packageType: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Sign-up successful!",
      description: `You have successfully signed up for the ${data.packageType} package.`,
    });
    navigate("/");
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    form.setValue("packageType", packageId);
    setStep(2);
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`cursor-pointer transition-all hover:border-apearmor-teal hover:shadow-md ${
                  selectedPackage === pkg.id ? "border-apearmor-teal border-2" : ""
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-apearmor-teal/20 flex items-center justify-center text-apearmor-teal">
                      {pkg.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center">{pkg.name}</CardTitle>
                  <CardDescription className="text-center">{pkg.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-gradient-gold mb-2">
                    {pkg.currency === "$" ? "$" : ""}{pkg.price}{pkg.currency !== "$" ? ` ${pkg.currency}` : ""}
                    <span className="text-sm text-muted-foreground ml-1">{pkg.interval}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="telegramUsername"
                  rules={{ required: "Telegram username is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Username</FormLabel>
                      <FormControl>
                        <Input placeholder="@yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="xUsername"
                  rules={{ required: "X (Twitter) username is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X (Twitter) Username</FormLabel>
                      <FormControl>
                        <Input placeholder="@yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
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

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-semibold mb-2">Terms and Conditions</h3>
                <div className="max-h-40 overflow-y-auto text-sm text-muted-foreground mb-4 border border-border p-3 rounded-md">
                  <p className="mb-2">By using ApeArmor services, you agree to the following terms:</p>
                  <p className="mb-2">1. <strong>Service Description:</strong> ApeArmor provides protection against various crypto scams and security threats as described in your selected package.</p>
                  <p className="mb-2">2. <strong>Eligibility:</strong> You must hold the minimum required amount of ApeArmor tokens for your selected package. Daily payments must be transferred before 12 am CST.</p>
                  <p className="mb-2">3. <strong>Refund Policy:</strong> Refunds are issued according to your package terms for eligible security incidents only.</p>
                  <p className="mb-2">4. <strong>Claims Process:</strong> All claims must be submitted within 72 hours of the incident with supporting evidence.</p>
                  <p className="mb-2">5. <strong>Limitations:</strong> ApeArmor protection applies only to supported blockchains and protocols.</p>
                  <p className="mb-2">6. <strong>Service Cancellation:</strong> You may cancel your subscription at any time without penalty.</p>
                  <p>7. <strong>Privacy Policy:</strong> Your personal and wallet information will be used only for service provision and security purposes.</p>
                </div>
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  rules={{ required: "You must agree to the terms and conditions" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
                >
                  Complete Signup
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        );
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
          
          <div className="mb-8">
            <div className="flex items-center justify-center mb-8">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-apearmor-teal text-black' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <div className={`h-1 w-20 ${step >= 2 ? 'bg-apearmor-teal' : 'bg-muted'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-apearmor-teal text-black' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">
                {step === 1 ? "Select Your Package" : "Complete Your Information"}
              </h2>
              <p className="text-muted-foreground">
                {step === 1 
                  ? "Choose the protection level that fits your needs" 
                  : "Provide your details to finalize your protection plan"}
              </p>
            </div>
          </div>
          
          {getStepContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
