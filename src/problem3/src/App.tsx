import React, { useEffect, useMemo, useState } from "react";
import useWalletBalances from "./hooks/useWalletBalances";
import { getPriority } from "./utilities";
import { FormattedWalletBalance, WalletBalance } from "./typing/Wallet";
import Datasource from "./typing/Datasource";
interface Props {}

const WalletPage: React.FC<Props> = (props: any) => {
  const balances = useWalletBalances();
	const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then((prices: any) => {
      setPrices(prices);
    }).catch((error: Error) => {
      console.error(error);
    });
  }, []);

  const sortedBalances = useMemo<any>(() => {
    return balances.filter((balance: any) => {
      const balancePriority = getPriority(balance.blockchain);
      if (balancePriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }
      return false
		}).sort((lhs: any, rhs: any) => { // eslint-disable-line
      return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
    });
  }, [balances]); // no need prices in dependencies array

  const formattedBalances = useMemo<WalletBalance[]>(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed()
    }));
  }, [sortedBalances]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...props}>
      {rows}
    </div>
  )
}

export default WalletPage;
