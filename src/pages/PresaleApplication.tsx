
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PresaleForm from "@/components/presale/PresaleForm";
import PublicAnnouncement from "@/components/PublicAnnouncement";

const PresaleApplication = () => {
  const announcementMessage = "Ape Armor's official token launch is May 4th, 2025. We are celebrating our milestone of success! Ape Armor LLC was officially registered as a Web3 company. To commemorate the milestone, we are launching the Ape Armor Token, ticker APE. Join us!";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <PublicAnnouncement message={announcementMessage} />
          <h1 className="text-3xl font-bold mb-8 text-gradient-gold">Presale Application</h1>
          <PresaleForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PresaleApplication;
