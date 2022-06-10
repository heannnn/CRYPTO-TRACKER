import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChartCandleStick from "./routes/ChartCandleStick";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path=":coinId" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<ChartCandleStick />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
