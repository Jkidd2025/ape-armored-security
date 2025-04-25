
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { SwapCard } from "./components/SwapCard";
import { WalletStatus } from "./components/WalletStatus";
import { useSwapInterface } from "./hooks/useSwapInterface";

const SwapInterface = () => {
  const {
    showSettings,
    setShowSettings,
    tokens,
    isLoading,
    error,
    refetch,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isConnected,
    slippage,
    deadline,
    isLoadingPrice,
    swapState,
    setFromToken,
    setToToken,
    setSlippage,
    setDeadline,
    handleSwapTokens,
    handleSwap,
    updateToAmount,
    refreshPrice,
    wallet,
    walletBalances,
    handleConnectClick,
    handleDisconnectClick,
    refreshWalletBalances
  } = useSwapInterface();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!tokens || tokens.length === 0) {
    return (
      <ErrorState 
        onRetry={refetch}
        title="No Tokens Available"
        description="Unable to load token data. Please try again later or contact support if the issue persists."
      />
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <SwapCard
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount}
        isConnected={isConnected}
        slippage={slippage}
        deadline={deadline}
        isLoadingPrice={isLoadingPrice}
        swapState={swapState}
        setFromToken={setFromToken}
        setToToken={setToToken}
        setSlippage={setSlippage}
        setDeadline={setDeadline}
        handleSwapTokens={handleSwapTokens}
        handleSwap={handleSwap}
        updateToAmount={updateToAmount}
        refreshPrice={refreshPrice}
        wallet={wallet}
        handleConnectClick={handleConnectClick}
        handleDisconnectClick={handleDisconnectClick}
        refreshWalletBalances={refreshWalletBalances}
      />
      <WalletStatus isConnected={isConnected} walletBalances={walletBalances} />
    </div>
  );
};

export default SwapInterface;
