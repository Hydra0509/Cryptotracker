import React from "react";
import "./Coin.css";

const Coin = ({ name, symbol, image, price, priceChange,currency,usdCurrency}) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
        </div>
        <div className="coin-data">
          <p className="coin-symbol">{symbol}</p>
          <p className="coin-price">{usdCurrency}{price} {currency}</p>
          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">+{priceChange.toFixed(2)}%</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;
