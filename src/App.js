import React, { useState, useEffect } from "react";
import Axios from "axios";
import Coin from "./Coin";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Coin2 from './Coin2'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [more, setMore] = useState(10);
  const [loading, setLoading] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("huf");
  const [currencyText, setCurrencyText] = useState("Ft");
  const [usdCurrencyText, setUsdCurrencyText] = useState();

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
    if (currentCurrency == "huf" || ("eur" && currencyText == "Ft") || "EUR") {
      setCurrentCurrency("usd");
      setUsdCurrencyText("$");
      setCurrencyText("");
    }
  }

  function hufCurrency() {
    if (currentCurrency == "usd" || ("eur" && currencyText == "$") || "EUR") {
      setCurrentCurrency("huf");
      setCurrencyText("Ft");
      setUsdCurrencyText("");
    }
  }

  function eurCurrency() {
    if (currentCurrency == "huf" || ("usd" && currencyText == "$") || "Ft") {
      setCurrentCurrency("eur");
      setCurrencyText("€");
      setUsdCurrencyText("");
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
  }, [
    more,
    usdCurrency,
    hufCurrency,
    eurCurrency,
    currencyText,
    usdCurrencyText,
  ]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <Container class="container-fluid md">
        <div>
          {loading ? (
            <div className="coin-app">
              <Row className="currencyButtons" xs={true} md={true}>
                <Col sm={2} md={1}>
                  <Button
                    style={{ boxShadow: "none" }}
                    variant="primary"
                    onClick={usdCurrency}
                  >
                    $ USD
                  </Button>
                </Col>
                <Col sm={2} md={1}>
                  <Button
                    style={{ boxShadow: "none" }}
                    variant="primary"
                    onClick={eurCurrency}
                  >
                    EUR €
                  </Button>
                </Col>
                <Col sm={2} md={1}>
                  <Button
                    style={{ boxShadow: "none" }}
                    variant="primary"
                    onClick={hufCurrency}
                  >
                    HUF
                  </Button>
                </Col>
              </Row>
                <Form>
                  <InputGroup size="sm">
                  <FormControl
                    className="coin-search" 
                    type="text"
                    placeholder="Search currency"
                    onChange={handleChange}
                  />
                </InputGroup>
                </Form>
              {filteredCoins.map((coin) => {
                return (
                  <Coin2
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
                <Button
                  style={{ boxShadow: "none" }}
                  variant="primary"
                  onClick={loadMore}
                >
                  Load More
                </Button>
              </div>
            </div>
          ) : (
            <div className="loading">
              <Spinner animation="border" role="status"></Spinner>
              <div>
                <h1>Loading...</h1>
              </div>
            </div>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
