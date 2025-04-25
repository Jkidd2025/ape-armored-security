
interface WalletStatusProps {
  isConnected: boolean;
  walletBalances: Record<string, number>;
}

export const WalletStatus = ({ isConnected, walletBalances }: WalletStatusProps) => {
  if (!isConnected) return null;

  return (
    <div className="text-xs text-center text-muted-foreground">
      {Object.keys(walletBalances).length > 0 ? (
        <div className="text-apearmor-teal">
          Wallet balances loaded successfully
        </div>
      ) : (
        <div className="text-yellow-500">
          Wallet connected but no balances detected
        </div>
      )}
    </div>
  );
};
