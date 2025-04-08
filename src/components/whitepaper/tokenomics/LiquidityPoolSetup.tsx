
import { Table } from "@/components/ui/table";

const LiquidityPoolSetup = () => {
  return (
    <div>
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
              <td className="border px-4 py-2">$0.00019065 per token</td>
              <td className="border px-4 py-2">$0.00019065 per token</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LiquidityPoolSetup;
