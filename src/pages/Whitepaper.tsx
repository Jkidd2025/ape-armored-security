
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Whitepaper = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-apearmor-teal hover:text-apearmor-teal/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold">ApeArmor Whitepaper</h1>
              <p className="text-xl text-muted-foreground">Security & Protection for Crypto Investments</p>
            </div>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">1. Introduction</h2>
              <p className="mb-4">
                As the cryptocurrency ecosystem continues to evolve at a rapid pace, so too do the risks associated with investing in this nascent and often volatile market. 
                The decentralized nature of blockchain technology, while revolutionary, has created an environment where scams, rug pulls, and other malicious activities have become all too common.
              </p>
              <p className="mb-4">
                ApeArmor was founded on the principle that crypto investors should be able to participate in this exciting market without constantly fearing the loss of their investments due to malicious actors.
                Our platform provides comprehensive protection against the most common crypto threats, allowing investors to "ape in" to new projects with confidence.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">2. Market Problem</h2>
              <p className="mb-4">
                The cryptocurrency market, despite its tremendous growth and potential, remains plagued by security concerns that deter both new and experienced investors:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Rug pulls resulting in complete loss of invested capital</li>
                <li>Pump and dump schemes manipulating token prices</li>
                <li>Smart contract vulnerabilities leading to exploits</li>
                <li>Wallet blacklisting preventing fund access</li>
                <li>Transaction failures resulting in wasted gas fees</li>
              </ul>
              <p>
                These issues have created a significant trust deficit in the market, with many potential investors remaining on the sidelines due to concerns about security and legitimacy.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">3. ApeArmor Solution</h2>
              <p className="mb-4">
                ApeArmor addresses these critical market problems through a comprehensive protection platform that safeguards investors' capital against various crypto threats.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Protection Packages</h3>
              <p className="mb-4">
                We offer tiered protection packages to fit the needs and risk profiles of different investors:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Chimp Package:</strong> Basic protection with up to 25% initial investment refund</li>
                <li><strong>Gorilla Package:</strong> Advanced protection with up to 50% initial investment refund</li>
                <li><strong>Silverback Package:</strong> Premium protection with up to 80% initial investment refund</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Coverage Areas</h3>
              <p className="mb-2">Our platform provides protection against:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Rug Pulls:</strong> Abrupt liquidity removals by project developers</li>
                <li><strong>Pump & Dump Schemes:</strong> Coordinated price manipulation</li>
                <li><strong>Smart Contract Failures:</strong> Vulnerabilities in audited contracts</li>
                <li><strong>Transaction Insurance:</strong> Coverage against failed transactions</li>
                <li><strong>Wallet Blacklisting:</strong> Protection against interacting with malicious wallets</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">4. Services & Implementation</h2>
              <p className="mb-4">
                ApeArmor leverages advanced blockchain monitoring and analysis technologies to detect potential scams and malicious activities.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Scam Detection Systems</h3>
              <p className="mb-4">
                Our platform employs sophisticated algorithms to monitor blockchain transactions and detect patterns indicative of scams, rug pulls, and other malicious activities. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Liquidity monitoring to detect potential rug pulls</li>
                <li>Price action analysis to identify pump and dump schemes</li>
                <li>Smart contract auditing to identify vulnerabilities</li>
                <li>Wallet reputation tracking to prevent interaction with malicious addresses</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Claim Processing</h3>
              <p className="mb-4">
                ApeArmor has developed a streamlined claim process that allows users to quickly receive reimbursement for covered losses. Our 24/7 support team handles claims efficiently, with most being processed within 1-2 business days.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">5. Tokenomics</h2>
              <p className="mb-4">
                The ApeArmor ecosystem is powered by our native token, which serves multiple purposes within our platform.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Token Utility</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Protection Eligibility:</strong> Minimum token holdings are required for each protection package</li>
                <li><strong>Governance:</strong> Token holders can participate in community governance decisions</li>
                <li><strong>Fee Reduction:</strong> Holding tokens reduces service fees</li>
                <li><strong>Staking Rewards:</strong> Token staking provides additional benefits</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Token Distribution</h3>
              <p className="mb-4">
                The total supply of ApeArmor tokens is capped at 1 billion, with the following distribution:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>40% - Public Sale & Community Distribution</li>
                <li>25% - Protection Pool Reserves</li>
                <li>15% - Team & Advisors (vested over 24 months)</li>
                <li>10% - Marketing & Partnerships</li>
                <li>10% - Ecosystem Development & Future Expansion</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">6. Roadmap</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phase 1: Foundation (Completed)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Community building and early adopter engagement</li>
                    <li>Token presale to early supporters</li>
                    <li>Launch of core protection features</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phase 2: Expansion (Current)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Strategic partnerships with key projects and platforms</li>
                    <li>Enhanced protection coverage for additional scam types</li>
                    <li>Improved claim processing system</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phase 3: Ecosystem Growth (Upcoming)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Launch of ApeArmor DAO for community governance</li>
                    <li>Integration with major DeFi platforms</li>
                    <li>Cross-chain protection expansion</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phase 4: Market Leadership (Future)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Decentralized insurance protocol</li>
                    <li>Advanced risk analysis tools for the community</li>
                    <li>Institutional-grade protection services</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">7. Conclusion</h2>
              <p className="mb-4">
                ApeArmor represents a significant step forward in addressing the security challenges that have hampered the growth and adoption of cryptocurrencies. By providing robust protection against scams, rug pulls, and other malicious activities, we empower investors to participate in the crypto market with confidence.
              </p>
              <p className="mb-4">
                Our mission is to create a safer environment for all crypto users, from experienced traders to newcomers just entering the space. With ApeArmor, users can truly "ape in" to new projects without constantly fearing the loss of their investments.
              </p>
              <p>
                Join us in building a more secure and trustworthy crypto ecosystem where innovation can thrive without being overshadowed by security concerns.
              </p>
            </section>
            
            <div className="mt-12 p-6 bg-muted rounded-lg border border-apearmor-darkbronze">
              <p className="text-center text-apearmor-teal font-semibold">
                "Ape in with Confidence – Armor Up Against Crypto Chaos!"
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Whitepaper;
