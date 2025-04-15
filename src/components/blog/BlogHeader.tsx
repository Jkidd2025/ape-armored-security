
import React from 'react';
import { Separator } from "@/components/ui/separator";

const BlogHeader = () => {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">Ape Wire</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8">
        Your trusted source for crypto news, education, and insights from the ApeArmor team
      </p>
      <Separator className="w-20 h-1 bg-apearmor-teal mb-8" />
    </div>
  );
};

export default BlogHeader;
