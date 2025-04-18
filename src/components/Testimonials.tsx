
import { Star, CircleUser } from "lucide-react";

const testimonials = [
  {
    quote: "I was refunded on BTM Relaunch and TCOIN. BTM relaunch was a scam built up using a profile called BigSalez, and TCOIN had an issue with Solana updating its metadata. Both times, I was refunded my initial investment.",
    author: "RJK",
    title: "Crypto Collector",
    stars: 5
  },
  {
    quote: "I was involved in both BTM relaunch and TCOIN. I believed in the projects, and wanted to see them send. I knew my choice was right with Ape Armor because both projects were covered and my initial investment was refunded.",
    author: "Crypto Duck",
    title: "Entrapernuer",
    stars: 5
  },
  {
    quote: "I can't express how grateful I am for Ape Armor's protection and support. After falling victim to two separate crypto scams, I thought my investments were gone for good. But thanks to their refund policy and commitment to protecting their clients, I was able to recover my losses in full (hundreds of dollars). Their transparency, professionalism, and dedication to customer security make them a rare gem in the crypto space.",
    author: "Charles T.",
    title: "Crypto/Meme Coin Buyer",
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
            Join thousands of crypto enthusiasts who sleep better at night knowing their purchases are protected
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
