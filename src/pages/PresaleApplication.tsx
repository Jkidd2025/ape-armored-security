
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PresaleForm from "@/components/presale/PresaleForm";

const PresaleApplication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gradient-gold">Presale Application</h1>
          <PresaleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PresaleApplication;
