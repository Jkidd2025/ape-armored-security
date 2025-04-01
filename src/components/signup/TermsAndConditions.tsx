
import React from "react";

const TermsAndConditions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-muted p-4 rounded-md">
      <h3 className="font-semibold mb-2">Terms and Conditions</h3>
      <div className="max-h-40 overflow-y-auto text-sm text-muted-foreground mb-4 border border-border p-3 rounded-md">
        <h4 className="font-bold mb-2">🛡️ ApeArmor: Terms and Conditions</h4>
        
        <h5 className="font-semibold mt-3 mb-1">📝 Claim Submission Procedure:</h5>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Customers must submit major claims such as rug pulls, pump 'n dumps, smart contract failures, and wallet blacklisting within 48 hours of identifying a loss.</li>
          <li>Transaction failure claims may be submitted once per month.</li>
          <li>Claims must include transaction details, wallet addresses involved, screenshots, and relevant communications or proofs.</li>
          <li>Submit claims through ApeArmor's dedicated 24/7 Scam Support Channel via Telegram. A claim specialist will DM directly for support information.</li>
        </ul>
        
        <h5 className="font-semibold mt-3 mb-1">✅ Covered Items:</h5>
        <p className="mb-1 font-medium">Initial Investment Refund:</p>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Chimp Package: Up to 25% of initial investment.</li>
          <li>Gorilla Package: Up to 50% of initial investment.</li>
          <li>Silverback Package: Up to 80% of initial investment.</li>
        </ul>
        <p className="mb-1">Rug Pull Protection: Coverage against abrupt liquidity removals by project creators.</p>
        <p className="mb-1">Pump 'n Dump Scams: Protection against fraudulent coordinated market manipulations.</p>
        
        <p className="mb-1 font-medium mt-2">Transaction Insurance:</p>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Coverage against unauthorized, fraudulent transactions and transaction failures.</li>
          <li>Blockchain provider transaction fee refunds:</li>
          <ul className="list-disc pl-5 space-y-1">
            <li>Chimp: Up to $50 per month.</li>
            <li>Gorilla: Up to $100 per month.</li>
            <li>Silverback: Up to $200 per month.</li>
          </ul>
        </ul>
        
        <p className="mb-1">Smart Contract Failure (Gorilla & Silverback packages only): Coverage for losses due to audited smart contract failures.</p>
        <p className="mb-1">Wallet Blacklisting (Silverback package only): Protection against interacting with blacklisted wallets.</p>
        
        <h5 className="font-semibold mt-3 mb-1">❌ Exclusions and Limitations:</h5>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Losses due to negligence, such as willingly sharing private keys or passwords.</li>
          <li>Market volatility and general price fluctuations.</li>
          <li>Losses resulting from non-covered scam types or unaudited projects.</li>
          <li>Losses exceeding stated investment coverage limits.</li>
          <li>Claims involving projects not reported promptly within the specified claim period.</li>
          <li>Transaction fee refunds exceeding monthly limits set for each package.</li>
          <li>Accounts must be current and paid up daily.</li>
          <li>Accounts must maintain minimum ApeArmor token holdings as defined per package.</li>
          <li>Only projects approved by ApeArmor will be covered by the service packages.</li>
          <li>ApeArmor reserves the right to refuse any claim.</li>
          <li>Coverage starts only after payment and wallet verification have been completed.</li>
          <li>Users must be currently holding a small portion of tokens being claimed for verification purposes.</li>
        </ul>
        
        <h5 className="font-semibold mt-3 mb-1">💳 Payout Timelines:</h5>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li>Refund payments can take up to 30 days; however, most claims are typically settled within 1-2 business days.</li>
          <li>Payments will be made in USDC based on the converted amount of the initial investment made and signed on the blockchain.</li>
        </ul>
        
        <h5 className="font-semibold mt-3 mb-1">📖 Definitions:</h5>
        <ul className="list-disc pl-5 mb-2 space-y-1">
          <li><strong>Initial Investment:</strong> The original amount of cryptocurrency invested into a specific project.</li>
          <li><strong>Rug Pull:</strong> The intentional and sudden removal of liquidity by project developers causing token value collapse.</li>
          <li><strong>Pump 'n Dump:</strong> A fraudulent practice involving coordinated efforts to artificially inflate and subsequently crash the token price.</li>
          <li><strong>Smart Contract Failure:</strong> Unintended and exploitable vulnerabilities in audited smart contracts.</li>
          <li><strong>Wallet Blacklisting:</strong> Identification and blocking of wallets associated with malicious activities.</li>
        </ul>
        
        <h5 className="font-semibold mt-3 mb-1">🚀 Tagline:</h5>
        <p className="mb-2">"Ape in with Confidence – Armor Up Against Crypto Chaos!"</p>
        
        <h5 className="font-semibold mt-3 mb-1">🏅 Mission Statement:</h5>
        <p>"At ApeArmor, our mission is to empower the crypto community—apes, degens, and moon-chasers alike—by providing robust protection against scams, rug pulls, and security threats. We're dedicated to making the meme coin space safer, so you can ape in boldly and securely."</p>
      </div>
      {children}
    </div>
  );
};

export default TermsAndConditions;
