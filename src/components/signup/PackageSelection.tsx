
import { Shield, BadgeCheck, Rocket } from "lucide-react";
import PackageCard from "./PackageCard";

export const packages = [
  {
    id: "chimp",
    name: "Chimp",
    subtitle: "Basic Protection",
    icon: <Shield className="h-10 w-10" />,
    price: "3",
    interval: "/day",
    currency: "$",
    setupFee: "$25 Account Setup Fee",
  },
  {
    id: "gorilla",
    name: "Gorilla",
    subtitle: "Advanced Protection",
    icon: <BadgeCheck className="h-10 w-10" />,
    price: "10",
    currency: "$",
    interval: "/day",
    setupFee: "$50 Account Setup Fee",
  },
  {
    id: "silverback",
    name: "Silverback",
    subtitle: "Premium Protection",
    icon: <Rocket className="h-10 w-10" />,
    price: "20",
    currency: "$",
    interval: "/day",
    setupFee: "$250 Account Setup Fee",
  },
];

type PackageSelectionProps = {
  selectedPackage: string | null;
  onPackageSelect: (packageId: string) => void;
};

const PackageSelection = ({ selectedPackage, onPackageSelect }: PackageSelectionProps) => {
  const handlePackageSelect = (packageId: string) => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Call the original onPackageSelect function
    onPackageSelect(packageId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {packages.map((pkg) => (
        <PackageCard 
          key={pkg.id}
          id={pkg.id}
          name={pkg.name}
          subtitle={pkg.subtitle}
          icon={pkg.icon}
          price={pkg.price}
          interval={pkg.interval}
          currency={pkg.currency}
          setupFee={pkg.setupFee}
          isSelected={selectedPackage === pkg.id}
          onSelect={handlePackageSelect}
        />
      ))}
    </div>
  );
};

export default PackageSelection;
