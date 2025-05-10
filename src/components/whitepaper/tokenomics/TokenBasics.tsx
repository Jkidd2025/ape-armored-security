
import { Table } from "@/components/ui/table";
import TotalSupplyCheck from "./TotalSupplyCheck";

const TokenBasics = () => {
  return (
    <div>
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
              <td className="border px-4 py-2">Circulating Supply</td>
              <td className="border px-4 py-2">720,013,915 APE</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Fully Diluted Value</td>
              <td className="border px-4 py-2">$748,100</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Decimals</td>
              <td className="border px-4 py-2">9</td>
            </tr>
          </tbody>
        </Table>
      </div>
      
      <TotalSupplyCheck />
    </div>
  );
};

export default TokenBasics;
