import React, { useState, useEffect } from "react";
import Axios from "axios";
import Coin from "./Coin";
import './App.css'
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    e.preventDefault();
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=huf&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then((res) => setCoins(res.data));
  }, []);

  return (
    <div className="coin-app">
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
          />
        );
      })}
    </div>
  );
}

export default App;
