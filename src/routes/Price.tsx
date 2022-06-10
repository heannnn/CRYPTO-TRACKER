import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Table = styled.table`
  font-size: small;
`;

interface RouteParams {
  coinId: string;
}

interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  border: solid #e1b12c;
  background-color: none;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
  }
`;

function Price() {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  const { isLoading, data } = useQuery<TickersData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <Tabs>
          <Tab>순위 : {data?.rank}</Tab>
          <Tab>종목 : {data?.name}</Tab>
          <Tab>기호 : {data?.symbol}</Tab>
          <Tab>
            가격(KRW) :{" "}
            {Number(data?.quotes.USD.price.toFixed(1)).toLocaleString()}
          </Tab>
          <Tab>
            총 시가 :{" "}
            {(Number(data?.quotes.USD.market_cap) / 1000000000000).toFixed(2)}
          </Tab>
          <Tab>
            거래량(24H) :{" "}
            {(Number(data?.quotes.USD.volume_24h) / 1000000000000).toFixed(2)}
          </Tab>
          <Tab>
            변동(24H) : {data?.quotes.USD.percent_change_24h.toFixed(2)}%
          </Tab>
          <Tab>변동(7D) : {data?.quotes.USD.percent_change_7d.toFixed(2)}%</Tab>
        </Tabs>
      )}
    </div>
  );
}
export default Price;
