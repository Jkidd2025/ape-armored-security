
import { Button } from "@/components/ui/button";
import { Check, Shield, BadgeCheck, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Chimp",
    subtitle: "Basic Protection",
    icon: <Shield className="h-10 w-10" />,
    price: "5",
    interval: "/day",
    currency: "$",
    setupFee: "$25 Account Setup Fee",
    features: [
      "25% initial investment refunded",
      "Rug Pull Protection",
      "Pump 'n Dump Scams",
      "Transaction Insurance",
      "24/7 Live Scam Support",
      "Minimum ApeArmor Token holding is equal to or greater than 1 Million",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Gorilla",
    subtitle: "Advanced Protection",
    icon: <BadgeCheck className="h-10 w-10" />,
    price: "10",
    currency: "$",
    interval: "/day",
    setupFee: "$50 Account Setup Fee",
    features: [
      "50% initial investment refunded",
      "Rug Pull Protection",
      "Pump 'n Dump Scams",
      "Transaction Insurance",
      "Smart Contract Failure",
      "24/7 Live Scam Support",
      "Minimum ApeArmor Token holding is equal to or greater than 5 Million",
    ],
    cta: "Armor Up",
    popular: true,
  },
  {
    name: "Silverback",
    subtitle: "Premium Protection",
    icon: <Rocket className="h-10 w-10" />,
    price: "20",
    currency: "$",
    interval: "/day",
    setupFee: "$250 Account Setup Fee",
    features: [
      "80% initial investment refunded",
      "Rug Pull Protection",
      "Pump 'n Dump Scams",
      "Transaction Insurance",
      "Smart Contract Failure",
      "Wallet Blacklisting",
      "24/7 Live Scam Support",
      "Exclusive ApeArmor Community",
      "Minimum ApeArmor Token holding is equal to or greater than 15 Million",
    ],
    cta: "Maximum Security",
    popular: false,
  },
];

const Packages = () => {
  return (
    <section id="packages" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-apearmor-teal/20 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-apearmor-teal" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            ApeArmor Protection Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Choose the level of protection that fits your crypto strategy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`security-package flex flex-col ${pkg.popular ? 'border-apearmor-teal border-2 border-glow' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-apearmor-teal text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rounded">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-apearmor-teal security-icon ${pkg.popular ? 'animate-glow' : ''}`}>
                  {pkg.icon}
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="flex items-center justify-center">
                  <span className="text-xl font-bold">{pkg.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-gradient-gold">{pkg.currency === "$" ? "$" : ""}{pkg.price}</span>
                <span className="text-muted-foreground ml-1">{pkg.currency !== "$" ? ` ${pkg.currency}` : ""}{pkg.interval}</span>
              </div>
              
              {pkg.setupFee && (
                <div className="text-center mb-4 text-muted-foreground">
                  <span>{pkg.setupFee}</span>
                </div>
              )}
              
              <ul className="mb-8 flex-1 space-y-4">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-apearmor-teal mt-0.5 mr-2 flex-shrink-0" />
                    <span className={idx === 0 && index > 0 ? "font-semibold" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to={`/signup`} className="mt-auto">
                <Button 
                  className={pkg.popular 
                    ? "bg-apearmor-teal hover:bg-apearmor-teal/80 text-black w-full" 
                    : "bg-muted border border-apearmor-gold hover:bg-apearmor-gold/10 text-apearmor-gold w-full"
                  }
                >
                  {pkg.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
