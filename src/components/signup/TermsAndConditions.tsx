
import React from "react";

const TermsAndConditions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-muted p-4 rounded-md">
      <h3 className="font-semibold mb-2">Terms and Conditions</h3>
      <div className="max-h-40 overflow-y-auto text-sm text-muted-foreground mb-4 border border-border p-3 rounded-md">
        <p className="mb-2">By using ApeArmor services, you agree to the following terms:</p>
        <p className="mb-2">1. <strong>Service Description:</strong> ApeArmor provides protection against various crypto scams and security threats as described in your selected package.</p>
        <p className="mb-2">2. <strong>Eligibility:</strong> You must hold the minimum required amount of ApeArmor tokens for your selected package. Daily payments must be transferred before 12 am CST.</p>
        <p className="mb-2">3. <strong>Refund Policy:</strong> Refunds are issued according to your package terms for eligible security incidents only.</p>
        <p className="mb-2">4. <strong>Claims Process:</strong> All claims must be submitted within 72 hours of the incident with supporting evidence.</p>
        <p className="mb-2">5. <strong>Limitations:</strong> ApeArmor protection applies only to supported blockchains and protocols.</p>
        <p className="mb-2">6. <strong>Service Cancellation:</strong> You may cancel your subscription at any time without penalty.</p>
        <p>7. <strong>Privacy Policy:</strong> Your personal and wallet information will be used only for service provision and security purposes.</p>
      </div>
      {children}
    </div>
  );
};

export default TermsAndConditions;
