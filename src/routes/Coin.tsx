import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
interface nameState {
  name: string;
}

interface RouteState {
  state: nameState;
}

function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as RouteState;
  const url = `https://api.coinpaprika.com/v1/coins/${coinId}`;
  const getPrice = async () => {
    const res = axios(url);
    setLoading(false);
  };

  useEffect(() => {
    getPrice();
  });

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading.."}</Title>
      </Header>
      {loading ? <Loader>"Loading ..."</Loader> : null}
    </Container>
  );
}

export default Coin;
