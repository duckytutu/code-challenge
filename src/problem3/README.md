```js
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.err(error);
    });
  }, []);

   const getPriority = (blockchain: any): number => {
      switch (blockchain) {
         case 'Osmosis':
            return 100
         case 'Ethereum':
            return 50
         case 'Arbitrum':
            return 30
         case 'Zilliqa':
            return 20
         case 'Neo':
            return 20
         default:
            return -99
      }
   }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
       const balancePriority = getPriority(balance.blockchain);
       if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
       }
       return false
     }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
         const leftPriority = getPriority(lhs.blockchain);
       const rightPriority = getPriority(rhs.blockchain);
       if (leftPriority > rightPriority) {
         return -1;
       } else if (rightPriority > leftPriority) {
         return 1;
       }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

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
    <div {...rest}>
      {rows}
    </div>
  )
}
```

1. This code block uses
   1. ReactJS with TypeScript.
   2. Functional components.
   3. React Hooks

   Answer: Ok

2. Implement the Datasource class so that it can retrieve the prices required.
   
   Answer:
```js
export default class Datasource {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getPrices() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then((response) => { return response.json() })
        .then((data) => resolve(data))
        .catch(e => reject(e))
    })
  }
}
```

3. You should explicitly state the issues and explain how to improve them.
   
   Answer: 
   1. `console.err(error);` typo issue. Fix: `console.error(error);`
   2. Use Object mapping instead of switch case for Priorities
   3. In the sort function, we can use direct numerical comparison instead of multiple if-else conditions.
      ```js
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
      ```
   4. Use useMemo to memoize the value of formattedBalances.
      ```js
      const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance) => ({
          ...balance,
          formatted: balance.amount.toFixed()
        }));
      }, [sortedBalances]);
      ```
   5. `FormattedWalletBalance` interface should extends from `WalletBallance` interface
   6. No need `prices` in `sortedBalances` useMemo's dependencies
   7. `lhsPriority` is not defined, i guess it should be `balancePriority` from the line above
   8. `formattedBalances` is declared but its value is never read.
