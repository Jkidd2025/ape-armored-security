
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Check } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-apearmor-dark to-card border border-apearmor-darkbronze">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-apearmor-teal rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-apearmor-gold rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center justify-center rounded-full bg-apearmor-teal/20 p-2 mb-4">
                <Shield className="h-6 w-6 text-apearmor-teal" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-gradient-gold mb-4">
                Ready to Armor Up Your Crypto?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of protected traders and investors who ape in with confidence, knowing ApeArmor has their back against crypto scams and threats.
              </p>
              
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-apearmor-teal mr-2" />
                  <span>30-day money-back guarantee</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-apearmor-teal mr-2" />
                  <span>No lock-in contracts - cancel anytime</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-apearmor-teal mr-2" />
                  <span>Immediate protection after sign-up</span>
                </li>
              </ul>
              
              <Button size="lg" className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
                Get Protected Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/f15cea00-0f09-4da3-ab78-f1ad7717ac39.png" 
                alt="Armored Ape" 
                className="w-60 md:w-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
