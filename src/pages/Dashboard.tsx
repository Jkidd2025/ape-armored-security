
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TokenStats from "@/components/dashboard/TokenStats";
import MarketData from "@/components/dashboard/MarketData";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import WalletDistribution from "@/components/dashboard/WalletDistribution";
import LiquidityPools from "@/components/dashboard/LiquidityPools";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>ApeArmor - Token Dashboard</title>
        <meta name="description" content="ApeArmor token statistics, market data, and ecosystem metrics" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <TokenStats />
          <MarketData />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TransactionHistory />
          <WalletDistribution />
        </div>
        
        <div className="mt-8">
          <LiquidityPools />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
