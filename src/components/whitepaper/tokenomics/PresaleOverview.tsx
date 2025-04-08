
import { Table } from "@/components/ui/table";

const PresaleOverview = () => {
  return (
    <div>
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
    </div>
  );
};

export default PresaleOverview;
