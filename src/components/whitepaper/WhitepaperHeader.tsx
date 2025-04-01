
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const WhitepaperHeader = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <Link to="/" className="flex items-center text-apearmor-teal hover:text-apearmor-teal/80 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">ApeArmor Whitepaper</h1>
        <p className="text-xl text-muted-foreground">Security & Protection for Crypto Investments</p>
      </div>
    </div>
  );
};

export default WhitepaperHeader;
