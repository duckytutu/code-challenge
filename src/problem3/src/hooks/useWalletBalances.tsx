import { useState } from "react";
import { WalletBalance } from "../typing/Wallet";

const useWalletBalances = () => {
  const balances = useState<WalletBalance[]>([
    { currency: 'USD', amount: 1 },
    { currency: 'VND', amount: 0.25 },
  ]);

  return balances
}

export default useWalletBalances;