
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Packages from "@/components/Packages";
import About from "@/components/About";
import ApprovedProjects from "@/components/ApprovedProjects";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Roadmap from "@/components/Roadmap";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import NftCollection from "@/components/NftCollection";
import DaoSection from "@/components/DaoSection";
import ApeMarket from "@/components/ApeMarket";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Packages />
        <About />
        <ApprovedProjects />
        <NftCollection />
        <DaoSection />
        <ApeMarket />
        <Testimonials />
        <Roadmap />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
