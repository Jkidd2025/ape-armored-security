
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-20 bg-apearmor-dark">
      <div className="container px-4 md:px-6">
        <div className="relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 order-1 lg:order-2">
              <ul className="space-y-8 mb-10">
                <li className="flex items-center">
                  <Check className="h-8 w-8 text-apearmor-teal mr-4 flex-shrink-0" />
                  <span className="text-white text-2xl font-medium">30-day money-back guarantee</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-8 w-8 text-apearmor-teal mr-4 flex-shrink-0" />
                  <span className="text-white text-2xl font-medium">No lock-in contracts - cancel anytime</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-8 w-8 text-apearmor-teal mr-4 flex-shrink-0" />
                  <span className="text-white text-2xl font-medium">Immediate protection after sign-up</span>
                </li>
              </ul>
              
              <div className="inline-block">
                <Button 
                  size="lg" 
                  className="bg-apearmor-teal hover:bg-apearmor-teal/90 text-black text-xl font-semibold px-8 py-6 h-auto rounded-md"
                >
                  Get Protected Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div className="flex-shrink-0 order-2 lg:order-1 mt-12 lg:mt-0">
              <img 
                src="/lovable-uploads/8c6feba1-fd7b-4d80-9c79-b154e6b71bb8.png" 
                alt="Armored Ape" 
                className="w-80 md:w-96 lg:w-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
