import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Card.css";

export default function Card() {

  const [exchangeRates, setExchangeRates] = useState({})
  const [amount, setAmount] = useState(1);
  const [fromcurrency, setFromCurrency] = useState('USD')
  const [tocurrency, setToCurrency] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    
    const apiUrl = `https://v6.exchangerate-api.com/v6/b69af5b78802c31e5ab1737c/latest/${fromcurrency}`;
    axios.get(apiUrl)
    .then(
      response => {
        setExchangeRates(response.data.conversion_rates);
      }
    )

    .catch(error => {
      console.error('Error fetching exchange rates:', error);
    });

  }, [fromcurrency])
  
  useEffect(() => {
    const conversionRate = exchangeRates[tocurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromcurrency, tocurrency, exchangeRates]);

  const handelChange = (e) => {

    const {name,value} = e.target;

    switch(name) {
      case 'amount': 
      setAmount(value);
      break;

      case 'fromcurrency': 
      setFromCurrency(value);
      break;

      case 'tocurrency': 
      setToCurrency(value);
      break;
    }
  }

  return (
    <div className="card">
      <h1 className="text-6xl">Currency Converter</h1>
      <div className="currency_exchange">
        <div className="input_container">
          <label className="input_label">Amount:</label>
          <input
            type="number"
            name="amount"
            value={amount}
            className="input_field"
            onChange={handelChange}
          ></input>
        </div>
        <div className="input_container">
          <label className="input_label">From Currency:</label>
          <select className="input_field" name="fromcurrency" value={fromcurrency} onChange={handelChange}>
            {
              Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            }
          </select>
        </div>
        <div className="input_container">
          <label className="input_label">To Currency:</label>
          <select className="input_field" name="tocurrency" value={tocurrency} onChange={handelChange}>
            
            {
              Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="output">
        <h2>Converted Amount: {convertedAmount}</h2>
      </div>
    </div>
  );
}
