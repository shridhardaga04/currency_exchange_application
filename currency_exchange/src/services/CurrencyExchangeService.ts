import { Currency } from "../types/Currency";
import { ExchangeRate } from "../types/ExchangeRate";

const BASE_URL = "https://api.exchangeratesapi.io";

export const CurrencyExchangeService = {
  getCurrencies: async (): Promise<Currency[]> => {
    const response = await fetch(`${BASE_URL}/latest`);
    const data = await response.json();

    const currencies = Object.keys(data.rates).map((code) => ({
      code,
      name: code,
    }));

    currencies.unshift({
      code: data.base,
      name: "Base",
    });

    return currencies;
  },
  getExchangeRate: async (from: string, to: string): Promise<ExchangeRate> => {
    const response = await fetch(
      `${BASE_URL}/latest?base=${from}&symbols=${to}`
    );
    const data = await response.json();

    return {
      from,
      to,
      rate: data.rates[to],
    };
  },
};
