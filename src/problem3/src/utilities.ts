export const getPriority = (blockchain: string): number => {
  const priorities: number | undefined = { // eslint-disable-line
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20
  }[blockchain]
  return priorities || -99;
}