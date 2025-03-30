
import { Shield, BadgeCheck, Rocket } from "lucide-react";
import PackageCard from "./PackageCard";

export const packages = [
  {
    id: "chimp",
    name: "Chimp",
    subtitle: "Basic Protection",
    icon: <Shield className="h-10 w-10" />,
    price: "5",
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

type PackageSelectionProps = {
  selectedPackage: string | null;
  onPackageSelect: (packageId: string) => void;
};

const PackageSelection = ({ selectedPackage, onPackageSelect }: PackageSelectionProps) => {
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
          onSelect={onPackageSelect}
        />
      ))}
    </div>
  );
};

export default PackageSelection;
