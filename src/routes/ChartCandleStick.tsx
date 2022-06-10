import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface RouteParams {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function ChartCandleStick() {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId!),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.flatMap((price) => [
                  {
                    x: new Date(price.time_open),
                    y: [price.open, price.high, price.low, price.close],
                  },
                ]) ?? [],
              // 24시간 이내로만 사용 가능하여 flatMap을 사용하여 시작 가격과 종료 가격 표현
            },
          ]}
          options={{
            theme: {
              palette: "palette1", // upto palette10
            },
            colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
            fill: {
              type: "pattern",
              pattern: {
                style: "verticalLines",
                width: 6,
                height: 6,
                strokeWidth: 2,
              },
            },
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
              tickAmount: undefined,
              tickPlacement: "between",
              labels: {
                show: true,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                show: false,
              },
            },
            tooltip: {
              enabled: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default ChartCandleStick;
