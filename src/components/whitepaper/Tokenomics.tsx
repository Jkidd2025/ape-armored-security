
import { Table } from "@/components/ui/table";

const Tokenomics = () => {
  return (
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
      </ul>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Token Basics</h3>
      <div className="overflow-x-auto mb-6">
        <Table>
          <thead>
            <tr>
              <th className="text-left font-medium">Token Detail</th>
              <th className="text-left font-medium">Specification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Token Name</td>
              <td className="border px-4 py-2">ApeArmor Token</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Symbol</td>
              <td className="border px-4 py-2">APE</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Blockchain</td>
              <td className="border px-4 py-2">Solana</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Total Supply</td>
              <td className="border px-4 py-2">1,000,000,000 APE</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Decimals</td>
              <td className="border px-4 py-2">9</td>
            </tr>
          </tbody>
        </Table>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Token Allocation</h3>
      <div className="overflow-x-auto mb-6">
        <Table>
          <thead>
            <tr>
              <th className="text-left font-medium">Allocation Category</th>
              <th className="text-left font-medium">% of Supply</th>
              <th className="text-left font-medium">Token Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Liquidity & Exchanges</td>
              <td className="border px-4 py-2">55.15%</td>
              <td className="border px-4 py-2">551,500,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Project Partnerships</td>
              <td className="border px-4 py-2">25%</td>
              <td className="border px-4 py-2">250,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Team & Dev</td>
              <td className="border px-4 py-2">3%</td>
              <td className="border px-4 py-2">30,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Presale Round 1</td>
              <td className="border px-4 py-2">10%</td>
              <td className="border px-4 py-2">100,026,233</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Presale Round 2</td>
              <td className="border px-4 py-2">4.35%</td>
              <td className="border px-4 py-2">43,487,682</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Presale Round 3</td>
              <td className="border px-4 py-2">2.5%</td>
              <td className="border px-4 py-2">25,000,000</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Presale Overview</h3>
      <div className="overflow-x-auto mb-6">
        <Table>
          <thead>
            <tr>
              <th className="text-left font-medium">Presale Metric</th>
              <th className="text-left font-medium">Round 1</th>
              <th className="text-left font-medium">Round 2</th>
              <th className="text-left font-medium">Round 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Total Tokens for Presale</td>
              <td className="border px-4 py-2">100,026,233</td>
              <td className="border px-4 py-2">43,487,682</td>
              <td className="border px-4 py-2">25,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Total Participants</td>
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">25</td>
              <td className="border px-4 py-2">25</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">SOL per Participant</td>
              <td className="border px-4 py-2">1.5 SOL</td>
              <td className="border px-4 py-2">1.5 SOL</td>
              <td className="border px-4 py-2">1.5 SOL</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Market Price of SOL</td>
              <td className="border px-4 py-2">$127.10</td>
              <td className="border px-4 py-2">$127.10</td>
              <td className="border px-4 py-2">$127.10</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">USD Value per Participant</td>
              <td className="border px-4 py-2">$190.65</td>
              <td className="border px-4 py-2">$190.65</td>
              <td className="border px-4 py-2">$190.65</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Tokens per Participant</td>
              <td className="border px-4 py-2">2,000,525</td>
              <td className="border px-4 py-2">1,739,507</td>
              <td className="border px-4 py-2">1,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Presale Token Price</td>
              <td className="border px-4 py-2">$0.0000953</td>
              <td className="border px-4 py-2">$0.0001096</td>
              <td className="border px-4 py-2">$0.00019065</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Total USD Raised</td>
              <td className="border px-4 py-2">$9,532.50</td>
              <td className="border px-4 py-2">$4,766.25</td>
              <td className="border px-4 py-2">$4,766.25</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Fully Diluted Market Cap (FDV)</td>
              <td className="border px-4 py-2">$95,325</td>
              <td className="border px-4 py-2">$109,595</td>
              <td className="border px-4 py-2">$190,650</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">5.5 Liquidity Pool Setup</h3>
      <div className="overflow-x-auto mb-6">
        <Table>
          <thead>
            <tr>
              <th className="text-left font-medium">Liquidity Metric</th>
              <th className="text-left font-medium">Liquidity Pool 1</th>
              <th className="text-left font-medium">Liquidity Pool 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Estimated Liquidity (10% of FDV)</td>
              <td className="border px-4 py-2">$9,532.50</td>
              <td className="border px-4 py-2">$4,766.25</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Tokens Allocated to Liquidity</td>
              <td className="border px-4 py-2">100,000,000</td>
              <td className="border px-4 py-2">50,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Cash Required (50%)</td>
              <td className="border px-4 py-2">$4,766.25</td>
              <td className="border px-4 py-2">$2,383.13</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Native Tokens Required (50%)</td>
              <td className="border px-4 py-2">50,000,000</td>
              <td className="border px-4 py-2">25,000,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Liquidity Token Price</td>
              <td className="border px-4 py-2">$0.0000953 per token</td>
              <td className="border px-4 py-2">$0.0001001 per token</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">5.6 Presale Vesting Schedule</h3>
      <div className="overflow-x-auto mb-6">
        <Table>
          <thead>
            <tr>
              <th className="text-left font-medium">Day</th>
              <th className="text-left font-medium">Round 1 Tokens</th>
              <th className="text-left font-medium">Round 2 Tokens</th>
              <th className="text-left font-medium">Round 3 Tokens</th>
              <th className="text-left font-medium">Total Daily Tokens</th>
              <th className="text-left font-medium">Round 1 per Participant</th>
              <th className="text-left font-medium">Round 2 per Participant</th>
              <th className="text-left font-medium">Round 3 per Participant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2" colSpan={8} className="text-center">...</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">20</td>
              <td className="border px-4 py-2">5,001,312</td>
              <td className="border px-4 py-2">2,174,384</td>
              <td className="border px-4 py-2">1,250,000</td>
              <td className="border px-4 py-2">8,425,696</td>
              <td className="border px-4 py-2">100,026</td>
              <td className="border px-4 py-2">86,975</td>
              <td className="border px-4 py-2">50,000</td>
            </tr>
            <tr className="font-semibold">
              <td className="border px-4 py-2">Total</td>
              <td className="border px-4 py-2">100,026,233</td>
              <td className="border px-4 py-2">43,487,682</td>
              <td className="border px-4 py-2">25,000,000</td>
              <td className="border px-4 py-2">168,513,915</td>
              <td className="border px-4 py-2">2,000,525</td>
              <td className="border px-4 py-2">1,739,507</td>
              <td className="border px-4 py-2">1,000,000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Tokenomics;
