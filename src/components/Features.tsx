
import { Shield, Wallet, Eye, Lock, ShieldAlert, Users, TrendingUp, TrendingDown } from "lucide-react";

const featureItems = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Transaction Insurance",
    description: "Get reimbursement protection against verified scams with our comprehensive coverage plans."
  },
  {
    icon: <ShieldAlert className="h-8 w-8" />,
    title: "Rug Pull Protection",
    description: "Rug Pull: The intentional and sudden removal of liquidity by project developers causing token value collapse."
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Pump n Dump",
    description: "Pump 'n Dump: A fraudulent practice involving coordinated efforts to artificially inflate and subsequently crash the token price."
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Smart Contract Failure",
    description: "Smart Contract Failure: Unintended and exploitable vulnerabilities in audited smart contracts."
  },
  {
    icon: <Wallet className="h-8 w-8" />,
    title: "Wallet Blacklisting",
    description: "Wallet Blacklisting: Identification and blocking of wallets associated with malicious activities."
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
            ApeArmor gives you more than hype, it gives you real protection for your crypto buys. Our comprehensive suite of services keeps you protected from the latest threats in the volatile crypto space.
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
