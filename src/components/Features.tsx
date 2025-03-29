
import { Shield, Bell, Eye, Lock, ShieldAlert, Users, TrendingUp, TrendingDown } from "lucide-react";

const featureItems = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Transaction Insurance",
    description: "Get reimbursement protection against verified scams with our comprehensive coverage plans."
  },
  {
    icon: <ShieldAlert className="h-8 w-8" />,
    title: "Rug Pull Protection",
    description: "Advanced monitoring system that detects suspicious liquidity moves and sudden dev wallet dumps."
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Pump n Dump",
    description: "Stay ahead with exclusive insights into emerging scam trends and malicious actor activities."
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Wallet Screening",
    description: "Instant checks for blacklisted wallets before completing any transactions."
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Real-Time Alerts",
    description: "Get instant notifications about potential scams and suspicious activities in the crypto space."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Support",
    description: "Join a dedicated community of crypto security enthusiasts and professionals."
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            Defend Your Crypto Assets
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Our comprehensive suite of security features keeps you protected from the latest threats in the volatile crypto wilderness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg border border-apearmor-darkbronze transition-all duration-300 hover:border-apearmor-teal group"
            >
              <div className="mb-4 text-apearmor-gold group-hover:text-apearmor-teal transition-colors security-icon">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
