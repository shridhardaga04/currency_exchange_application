import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { Dropdown } from './Dropdown';
import { CurrencyExchangeService } from '../services/CurrencyExchangeService';
import { Currency } from '../types/Currency';
import { ExchangeRate } from '../types/ExchangeRate';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currencies = await CurrencyExchangeService.getCurrencies();
      setCurrencies(currencies);
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const exchangeRate = await CurrencyExchangeService.getExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(exchangeRate);
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCurrency(event.target.value);
  };

  const getConvertedAmount = (): number => {
    if (exchangeRate) {
      return amount * exchangeRate.rate;
    }
    return 0;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Currency Converter
      </Typography>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
        fullWidth
        margin="normal"
      />
      <Dropdown label="From" value={fromCurrency} onChange={handleFromCurrencyChange} options={currencies} />
      <Dropdown label="To" value={toCurrency} onChange={handleToCurrencyChange} options={currencies} />
      <Typography variant="h6" align="center">
        Converted Amount: {`${getConvertedAmount().toFixed(2)} ${toCurrency}`}
      </Typography>
    </Container>
  );
};
