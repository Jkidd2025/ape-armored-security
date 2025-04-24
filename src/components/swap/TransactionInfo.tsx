
import { SwapState } from "@/types/swap";

interface TransactionInfoProps {
  swapState: SwapState;
}

export const TransactionInfo = ({ swapState }: TransactionInfoProps) => {
  if (!swapState.txHash && !swapState.error) return null;

  return (
    <>
      {swapState.txHash && (
        <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-md">
          <p className="text-xs text-center break-all">
            Transaction: {swapState.txHash}
          </p>
        </div>
      )}

      {swapState.error && (
        <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-md">
          <p className="text-xs text-center text-red-500">
            {swapState.error}
          </p>
        </div>
      )}
    </>
  );
};
