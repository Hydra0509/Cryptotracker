import React, { useState, useEffect } from "react";
import Axios from "axios";
import Coin from "./Coin";
import "./App.css";
import loadingimage from "./giphy.gif";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [more, setMore] = useState(10);
  const [loading, setLoading] = useState(false);
  const [currentCurrency,setCurrentCurrency] = useState('huf')
  const [currencyText,setCurrencyText] = useState('Ft')
  const [usdCurrencyText,setUsdCurrencyText] = useState()

  const handleChange = (e) => {
    setSearch(e.target.value);
    e.preventDefault();
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => {
    setMore((more) => more + 10);
  };

  function usdCurrency() {
    if (currentCurrency == 'huf' || 'eur' && currencyText == 'Ft' || 'EUR') {
      setCurrentCurrency('usd')
      setUsdCurrencyText('$')
      setCurrencyText('')
    }
  }

  function hufCurrency() {
    if (currentCurrency == 'usd' || 'eur' && currencyText == '$' || 'EUR') {
      setCurrentCurrency('huf')
      setCurrencyText('Ft')
      setUsdCurrencyText('')
    }
  }

  function eurCurrency() {
    if (currentCurrency == 'huf' || 'usd' && currencyText == '$' || 'Ft') {
      setCurrentCurrency('eur')
      setCurrencyText('EUR')
      setUsdCurrencyText('')
    }
  }

  const getData = async () => {
    try {
      await Axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=${more}&page=1&sparkline=false`
      ).then((res) => {
        setCoins(res.data);
      });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [more,usdCurrency,hufCurrency,eurCurrency,currencyText,usdCurrencyText]);

  return (
    <div>
      {loading ? (
        <div className="coin-app">
        <div className="currencyButtons">
        <button onClick={usdCurrency}>USD</button>
        <button onClick={eurCurrency}>EUR</button>
        <button onClick={hufCurrency}>HUF</button>
        </div>
          <div className="coin-search">
            <form>
              <input
                type="text"
                placeholder="Search for a currency"
                onChange={handleChange}
              />
            </form>
          </div>
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                image={coin.image}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                priceChange={coin.price_change_percentage_24h}
                currency={currencyText}
                usdCurrency={usdCurrencyText}
              />
            );
          })}
          <div className="loadmore-button">
            <button onClick={loadMore}>Load More</button>
          </div>
        </div>
      ) : (
        <div className="loading-gif-div"><img alt="loading image" className="loading-gif" src={loadingimage} /><h1>Loading...</h1></div>
      )}
    </div>
  );
}

export default App;
