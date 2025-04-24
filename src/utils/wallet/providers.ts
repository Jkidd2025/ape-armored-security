
// Helper functions for working with different wallet providers
export const getPhantomProvider = () => (window as any).phantom?.solana;
export const getSolflareProvider = () => (window as any).solflare;

export const getWalletProviders = () => {
  const phantomProvider = getPhantomProvider();
  const solflareProvider = getSolflareProvider();
  
  return {
    phantomProvider,
    solflareProvider,
    hasProviders: !!(phantomProvider || solflareProvider)
  };
};

export const getConnectedProvider = () => {
  const { phantomProvider, solflareProvider } = getWalletProviders();
  
  if (phantomProvider?.isConnected) return phantomProvider;
  if (solflareProvider?.isConnected) return solflareProvider;
  return null;
};
