
import { Table } from "@/components/ui/table";

const VestingSchedule = () => {
  return (
    <div>
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
              <td className="border px-4 py-2" colSpan={8}>...</td>
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
    </div>
  );
};

export default VestingSchedule;
