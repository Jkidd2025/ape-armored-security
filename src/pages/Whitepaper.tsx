
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhitepaperHeader from "@/components/whitepaper/WhitepaperHeader";
import Introduction from "@/components/whitepaper/Introduction";
import MarketProblem from "@/components/whitepaper/MarketProblem";
import ApeArmorSolution from "@/components/whitepaper/ApeArmorSolution";
import Implementation from "@/components/whitepaper/Implementation";
import Tokenomics from "@/components/whitepaper/Tokenomics";
import Roadmap from "@/components/whitepaper/Roadmap";
import DaoInitiative from "@/components/whitepaper/DaoInitiative";
import Conclusion from "@/components/whitepaper/Conclusion";
import SectionSeparator from "@/components/whitepaper/SectionSeparator";
import WhitepaperQuote from "@/components/whitepaper/WhitepaperQuote";

const Whitepaper = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <WhitepaperHeader />
          
          <div className="space-y-8">
            <Introduction />
            
            <SectionSeparator />
            
            <MarketProblem />
            
            <SectionSeparator />
            
            <ApeArmorSolution />
            
            <SectionSeparator />
            
            <Implementation />
            
            <SectionSeparator />
            
            <Tokenomics />
            
            <SectionSeparator />
            
            <Roadmap />
            
            <SectionSeparator />
            
            <DaoInitiative />
            
            <SectionSeparator />
            
            <Conclusion />
            
            <WhitepaperQuote />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
