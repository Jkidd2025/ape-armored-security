
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { requestWalletPermissions } from '@/services/swap/walletPermissions';
import { getWalletProviders, getPhantomProvider, getSolflareProvider } from '@/utils/wallet/providers';

export const useWalletState = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const { toast } = useToast();

  const handleExistingConnection = async (provider: any, providerName: string) => {
    console.log(`Found connected ${providerName} wallet`);
    setIsConnected(true);
    setCurrentProvider(provider);
    
    try {
      const publicKey = provider.publicKey?.toString();
      if (publicKey) {
        setWalletPublicKey(publicKey);
        console.log(`${providerName} wallet public key:`, publicKey);
        return true;
      } else {
        console.warn(`${providerName} wallet is connected but no public key available`);
        const reconnected = await requestWalletPermissions(provider);
        if (reconnected && provider.publicKey) {
          setWalletPublicKey(provider.publicKey.toString());
          return true;
        }
      }
    } catch (err) {
      console.error(`Error accessing ${providerName} wallet public key:`, err);
    }
    return false;
  };

  return {
    isConnected,
    isConnecting,
    walletPublicKey,
    currentProvider,
    setIsConnected,
    setIsConnecting,
    setWalletPublicKey,
    setCurrentProvider,
    handleExistingConnection
  };
};
