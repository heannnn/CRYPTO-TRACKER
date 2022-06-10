import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChartCandleStick from "./routes/ChartCandleStick";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
        <Route path={`${process.env.PUBLIC_URL}/:coinId`} element={<Coin />}>
          <Route
            path={`${process.env.PUBLIC_URL}/:coinId/price`}
            element={<Price />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/:coinId/chart`}
            element={<ChartCandleStick />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
