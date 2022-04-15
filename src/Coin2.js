import React from "react";
import "./Coin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { Container } from "react-bootstrap";

const Coin2 = ({ name, symbol, image, price, priceChange,currency,usdCurrency}) => {
  return (
    <ThemeProvider
    breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
  >
    <Container fluid className="coin-container">
        <Row  className="coin-row" md="auto" >
            <Col  sm={true} md={true} className="coin">
            <img src={image} alt="crypto" />
             <h1>{name}</h1>
          </Col>
        </Row>
        <Row className="coin-row" md="auto" >
        <Col sm={true} md="auto" className="coin-data">
          <p className="coin-symbol">{symbol}</p>
        </Col>
        </Row>
        <Row className="coin-row" md="auto" >
        <Col sm={true} md="auto" className="coin-data">
          <p className="coin-price">{usdCurrency}{price} {currency}</p>
        </Col>
        </Row>
        <Row className="coin-row" md="auto" >
        <Col sm={true} md="auto" className="coin-data">
          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">+{priceChange.toFixed(2)}%</p>
          )}
          </Col>
          </Row>
      </Container>
    </ThemeProvider>
  );
};

export default Coin2;
