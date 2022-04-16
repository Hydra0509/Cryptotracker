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
        <Row className="coin-row" >
            <Col xs={4} xxs={3} sm={1} md={3} lg={1} xxl={1} xxxl={3} xl={1} className="coin">
            <img src={image} alt="crypto" />
             <h1>{name}</h1>
          </Col>

        <Col xs={4} xxs={3} sm={3} md={3} lg={1} xxl={2} xxxl={3}  xl={1} className="coin-data">
          <p className="coin-symbol">{symbol}</p>
        </Col>
        
        <Col xs={4} xxs={3} sm={3} md={3} lg={1} xxl={2} xxxl={3}   xl={2} className="coin-data">
          <p className="coin-price">{usdCurrency}{price} {currency}</p>
        </Col>
      <Col xs={2} xxs={3} sm={3} md={3} lg={1} xxl={2} xxxl={3} xl={1} className="coin-data">
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
