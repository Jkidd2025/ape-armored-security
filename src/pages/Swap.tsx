
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwapInterface from "@/components/swap/SwapInterface";

const Swap = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gradient-gold">ApeArmor Swap</h1>
          <SwapInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Swap;
