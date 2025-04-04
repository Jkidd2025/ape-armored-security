
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

const NftCollection = () => {
  const nfts = [
    {
      id: 1,
      title: "ApeArmor Genesis",
      description: "First generation of ApeArmor NFTs with unique security benefits for holders.",
      image: "/lovable-uploads/3abadd80-24aa-4428-8eef-1a7df0d7b245.png",
      price: "0.5 ETH",
      rarity: "Rare",
      benefits: ["Premium Discord Access", "Security Audits Priority", "Governance Rights"]
    },
    {
      id: 2,
      title: "CryptoGuardian",
      description: "Exclusive protector NFTs that provide enhanced security features and early warnings.",
      image: "/lovable-uploads/d62bf749-46f4-4484-a592-a8f81cf79a81.png",
      price: "0.75 ETH",
      rarity: "Epic",
      benefits: ["Threat Detection Alerts", "Weekly Security Reports", "Exclusive Webinars"]
    },
    {
      id: 3,
      title: "Sentinel Prime",
      description: "Legendary tier NFTs that offer the highest level of protection and exclusive perks.",
      image: "/lovable-uploads/8c6feba1-fd7b-4d80-9c79-b154e6b71bb8.png",
      price: "1.2 ETH",
      rarity: "Legendary",
      benefits: ["24/7 Security Monitoring", "Personal Security Advisor", "Access to All Future NFT Drops"]
    }
  ];

  return (
    <section id="nft-collection" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">Exclusive NFT Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Own a piece of ApeArmor's security ecosystem with our exclusive NFT collection. Each NFT provides unique benefits and access to premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <Card key={nft.id} className="border border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300 overflow-hidden">
              <div className={`relative overflow-hidden w-full ${nft.id === 1 ? 'h-64' : 'h-56'}`}>
                <img 
                  src={nft.image} 
                  alt={nft.title} 
                  className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${nft.id === 1 ? 'object-contain p-2' : 'object-cover'}`}
                />
                <Badge className="absolute top-3 right-3 bg-apearmor-teal text-black">
                  {nft.rarity}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle>{nft.title}</CardTitle>
                <CardDescription>{nft.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-apearmor-teal">{nft.price}</p>
                  <h4 className="text-sm font-medium">Benefits:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {nft.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Eye size={16} />
                  View Details
                </Button>
                <Button size="sm" className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black flex gap-1 items-center">
                  <ShoppingCart size={16} />
                  Mint Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black">
            View Complete Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NftCollection;
