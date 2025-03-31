
import { Info, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <section id="about" className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">About ApeArmor</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Protecting your crypto investments with industry-leading security solutions
          </p>
          <Separator className="w-20 h-1 bg-apearmor-teal my-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card className="bg-card/50 backdrop-blur-sm border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-apearmor-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To secure the crypto ecosystem and empower users to invest with confidence through 
                advanced protection tools and education.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-apearmor-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-muted-foreground">
                A diverse group of security experts, blockchain specialists, and crypto enthusiasts 
                committed to creating a safer environment for all crypto users.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Info className="h-7 w-7 text-apearmor-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Story</h3>
              <p className="text-muted-foreground">
                Founded in 2025 after recognizing the need for better protection against scams and 
                rug pulls in the crypto space, we've been dedicated to safeguarding the community ever since.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
