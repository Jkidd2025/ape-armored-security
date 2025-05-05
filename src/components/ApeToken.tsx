
import { Button } from "@/components/ui/button";
import { Shield, Wallet, CircleDollarSign, Badge, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const ApeToken = () => {
  return (
    <section id="ape-token" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-apearmor-teal/20 flex items-center justify-center mb-4">
            <Coins className="h-8 w-8 text-apearmor-teal" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            APE Utility Token
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            The native token that powers the ApeArmor ecosystem, providing access to protection services, 
            governance rights, and additional benefits for token holders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-muted p-6 rounded-lg border border-apearmor-darkbronze flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-apearmor-teal/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-apearmor-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Protection Access</h3>
            <p className="text-muted-foreground">
              Minimum token holdings required for protection package eligibility. Higher tier packages require larger holdings.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg border border-apearmor-darkbronze flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-apearmor-teal/20 flex items-center justify-center mb-4">
              <CircleDollarSign className="h-6 w-6 text-apearmor-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fee Reduction</h3>
            <p className="text-muted-foreground">
              Token holders enjoy reduced service fees and setup costs. The more tokens held, the greater the discount.
            </p>
          </div>
          
          <div className="bg-muted p-6 rounded-lg border border-apearmor-darkbronze flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-apearmor-teal/20 flex items-center justify-center mb-4">
              <Badge className="h-6 w-6 text-apearmor-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">DAO Governance</h3>
            <p className="text-muted-foreground">
              Token holders can participate in community governance decisions and vote on proposals affecting the protocol.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center bg-muted border border-apearmor-darkbronze rounded-lg p-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Token Requirements</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-apearmor-teal mt-0.5 mr-2 flex-shrink-0" />
                <span>Chimp Package: 2 Million ApeArmor tokens minimum</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-apearmor-teal mt-0.5 mr-2 flex-shrink-0" />
                <span>Gorilla Package: 15 Million ApeArmor tokens minimum</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-apearmor-teal mt-0.5 mr-2 flex-shrink-0" />
                <span>Silverback Package: 50 Million ApeArmor tokens minimum</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col space-y-6">
              <div>
                <h4 className="text-xl font-semibold">Ready to get protected?</h4>
                <p className="text-muted-foreground mb-4">
                  Acquire tokens and access our protection services to secure your crypto investments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/swap">
                    <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
                      <Wallet className="mr-2 h-4 w-4" />
                      Swap Tokens
                    </Button>
                  </Link>
                  <a href="#packages">
                    <Button variant="outline" className="border-apearmor-teal text-apearmor-teal hover:bg-apearmor-teal/10">
                      View Protection Packages
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/whitepaper">
            <Button variant="outline" className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10">
              Read Full Tokenomics in Whitepaper
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ApeToken;
