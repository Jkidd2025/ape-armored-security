
import React from "react";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./contact/ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Have questions or need assistance? Select a contact reason below and we'll get back to you shortly.
          </p>
          <Separator className="w-20 h-1 bg-apearmor-teal my-6" />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
