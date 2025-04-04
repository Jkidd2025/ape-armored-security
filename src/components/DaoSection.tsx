
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const DaoSection = () => {
  return (
    <section id="dao" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">ApeArmor DAO</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Decentralized governance for a safer crypto ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-apearmor-teal">What is the ApeArmor DAO?</h3>
            <p className="text-foreground">
              A Decentralized Autonomous Organization (DAO) is a community-led entity with no central authority. 
              The ApeArmor DAO empowers our community to collectively make decisions about platform development, 
              security protocols, and treasury management.
            </p>
            
            <div className="space-y-4">
              <div className="border border-apearmor-darkbronze rounded-lg p-4 hover:border-apearmor-teal transition-colors">
                <h4 className="font-medium mb-2">Community Governance</h4>
                <p className="text-sm text-muted-foreground">
                  Token holders vote on important decisions, ensuring the platform evolves according to community needs.
                </p>
              </div>
              
              <div className="border border-apearmor-darkbronze rounded-lg p-4 hover:border-apearmor-teal transition-colors">
                <h4 className="font-medium mb-2">Transparent Operations</h4>
                <p className="text-sm text-muted-foreground">
                  All governance proposals, voting results, and treasury activities are recorded on-chain for complete transparency.
                </p>
              </div>
              
              <div className="border border-apearmor-darkbronze rounded-lg p-4 hover:border-apearmor-teal transition-colors">
                <h4 className="font-medium mb-2">Shared Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  DAO members receive a share of platform revenue and exclusive access to new features and services.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black group"
                size="lg"
                onClick={() => window.open("https://dao.apearmor.com", "_blank")}
              >
                Join the ApeArmor DAO
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-apearmor-teal/30 to-apearmor-darkbronze/30 rounded-lg blur-lg"></div>
            <div className="relative bg-muted p-8 rounded-lg border border-apearmor-darkbronze">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-apearmor-teal/10 rounded-full">
                  <img 
                    src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
                    alt="ApeArmor DAO" 
                    className="h-32 w-32" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total DAO Members</span>
                  <span className="font-medium">Pending Launch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Proposals</span>
                  <span className="font-medium">Pending Launch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Treasury Value</span>
                  <span className="font-medium">Pending Launch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Power Threshold</span>
                  <span className="font-medium">Pending Launch</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-apearmor-darkbronze">
                <p className="text-sm text-center text-muted-foreground">
                  "The ApeArmor DAO represents a revolutionary approach to decentralized security governance in the crypto space."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaoSection;
