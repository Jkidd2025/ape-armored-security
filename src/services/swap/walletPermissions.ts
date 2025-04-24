
export const requestWalletPermissions = async (provider: any): Promise<boolean> => {
  try {
    if (!provider) {
      console.error("No wallet provider available");
      return false;
    }
    
    console.log("Requesting wallet permissions...");
    
    if (provider === (window as any).phantom?.solana) {
      const resp = await provider.connect();
      console.log("Phantom connection response:", resp);
      return !!resp.publicKey;
    }
    
    if (provider === (window as any).solflare) {
      const resp = await provider.connect();
      console.log("Solflare connection response:", resp);
      return provider.isConnected;
    }
    
    return false;
  } catch (error) {
    console.error("Error requesting wallet permissions:", error);
    return false;
  }
};
