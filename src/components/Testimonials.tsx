
import { Star, CircleUser } from "lucide-react";

const testimonials = [
  {
    quote: "ApeArmor saved me from a near-miss rug pull. The alerts came just in time, and I got my funds out before disaster struck.",
    author: "CryptoWhale92",
    title: "NFT Collector",
    stars: 5
  },
  {
    quote: "The transaction insurance alone is worth the subscription. When I got scammed, ApeArmor reimbursed me within 48 hours.",
    author: "MoonGirl",
    title: "DeFi Trader",
    stars: 5
  },
  {
    quote: "My dedicated advisor at ApeArmor helped me set up proper wallet security that even a crypto newbie like me could understand.",
    author: "DegenDave",
    title: "Meme Coin Enthusiast",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">
            Protected by the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Join thousands of crypto enthusiasts who sleep better at night knowing their investments are protected
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-apearmor-darkbronze">
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.stars ? 'text-apearmor-gold fill-apearmor-gold' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="mb-6">
                <p className="text-foreground italic">"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="flex items-center">
                <CircleUser className="h-10 w-10 text-apearmor-teal mr-3" />
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
