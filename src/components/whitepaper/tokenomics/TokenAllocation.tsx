
import { Table } from "@/components/ui/table";

const TokenAllocation = () => {
  return (
    <div>
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
    </div>
  );
};

export default TokenAllocation;
