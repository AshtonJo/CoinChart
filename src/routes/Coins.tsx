import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 48px;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
  a {
    align-items: center;
    transition: color 0.2s ease-in;
    display: flex;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const endpoint = "https://proxy.cors.sh/https://api.coinpaprika.com/v1/coins";
  const getCoins = async () => {
    const res = await axios(endpoint);
    setCoins(res.data.slice(0, 10));
    setLoading(false);
  };
  useEffect(() => {
    getCoins();
  });
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>"Loading ..."</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img alt="coin_img" src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
