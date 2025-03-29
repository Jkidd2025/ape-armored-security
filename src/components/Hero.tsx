
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-apearmor-dark opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('/lovable-uploads/d375a203-9c97-478d-a14e-76ca16818f1a.png')] bg-cover bg-center opacity-20 z-0"></div>
      
      {/* Decorative chains */}
      <div className="absolute top-1/4 left-0 w-1/3 h-20 bg-[url('/lovable-uploads/d375a203-9c97-478d-a14e-76ca16818f1a.png')] bg-cover opacity-40 z-0 transform -rotate-12"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-20 bg-[url('/lovable-uploads/d375a203-9c97-478d-a14e-76ca16818f1a.png')] bg-cover opacity-40 z-0 transform rotate-12"></div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
              alt="ApeArmor Logo" 
              className="h-48 w-48 md:h-64 md:w-64 animate-pulse-shield"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-gradient-gold">Ape in with Confidence</span>
            <span className="block text-glow text-apearmor-teal"> – Armor Up Against Crypto Chaos!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
            At ApeArmor, our mission is to empower the crypto community—apes, degens, and moon-chasers alike—by providing robust protection against scams, rug pulls, and security threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button size="lg" className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black flex-1">
              Get Protected
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10 flex-1">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
