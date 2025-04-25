
import { useState } from 'react';
import { TokenInfo } from "@/services/solanaTracker";
import { mockTokens } from "@/components/swap/mockData";

export const useSwapState = (initialFromToken: TokenInfo | null, initialToToken: TokenInfo | null) => {
  const [fromToken, setFromToken] = useState<TokenInfo>(initialFromToken || mockTokens[0]);
  const [toToken, setToToken] = useState<TokenInfo>(initialToToken || mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("30");

  const handleSwapTokens = () => {
    const tempFromToken = fromToken;
    setFromToken(toToken);
    setToToken(tempFromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippage,
    deadline,
    setFromToken,
    setToToken,
    setFromAmount,
    setToAmount,
    setSlippage,
    setDeadline,
    handleSwapTokens,
  };
};
