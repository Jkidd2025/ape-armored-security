
import { Shield, BadgeCheck, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PackageProps = {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  price: string;
  interval: string;
  currency: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

const PackageCard = ({
  id,
  name,
  subtitle,
  icon,
  price,
  interval,
  currency,
  isSelected,
  onSelect,
}: PackageProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-apearmor-teal hover:shadow-md ${
        isSelected ? "border-apearmor-teal border-2" : ""
      }`}
      onClick={() => onSelect(id)}
    >
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-apearmor-teal/20 flex items-center justify-center text-apearmor-teal">
            {icon}
          </div>
        </div>
        <CardTitle className="text-center">{name}</CardTitle>
        <CardDescription className="text-center">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-3xl font-bold text-gradient-gold mb-2">
          {currency === "$" ? "$" : ""}{price}{currency !== "$" ? ` ${currency}` : ""}
          <span className="text-sm text-muted-foreground ml-1">{interval}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
