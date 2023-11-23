import { useEffect, useMemo, useState } from 'react';

const usePrices = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    fetch('https://interview.switcheo.com/prices.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const removedDuplicatePrices: any = [
          ...new Map(data.map((v: any) => [v.currency, v])).values(),
        ];
        setPrices(removedDuplicatePrices);
      });
  }, []);

  const currencyList = useMemo(
    () => prices.map(({ currency }) => currency),
    [prices],
  );

  const getPrice = (currency: string) =>
    (prices.find((price: any) => price.currency === currency) as any)?.price;

  return {
    prices,
    currencyList,
    getPrice,
  };
};

export default usePrices;
