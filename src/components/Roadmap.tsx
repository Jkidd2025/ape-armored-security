
import { Check, Rocket, Users, Handshake, Calendar } from "lucide-react";

const roadmapItems = [
  {
    title: "Community Building",
    description: "Growing a strong community foundation of early adopters and supporters.",
    icon: Users,
    completed: true
  },
  {
    title: "Presale",
    description: "Initial token offering to our early supporters and community members.",
    icon: Calendar,
    completed: true
  },
  {
    title: "Launch",
    description: "Official platform launch with core security features and protection.",
    icon: Rocket,
    completed: true
  },
  {
    title: "Strategic Partnerships",
    description: "Develop strategic partnerships to grow the ApeArmor ecosystem.",
    icon: Handshake,
    completed: false
  }
];

const Roadmap = () => {
  return (
    <section className="py-20" id="roadmap">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            Our Roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Building the future of secure crypto step by step
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <div 
              key={index} 
              className="relative bg-card p-6 rounded-lg border border-apearmor-darkbronze hover:border-apearmor-teal transition-all"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-full">
                  <item.icon className="h-8 w-8 text-apearmor-teal" />
                </div>
                {item.completed && (
                  <div className="absolute top-4 right-4">
                    <Check className="h-5 w-5 text-apearmor-teal" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
