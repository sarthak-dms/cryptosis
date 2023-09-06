import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import Coins from "./components/Coins/Coins"
import Exchanges from "./components/Exchanges/Exchanges"
import CoinDetails from "./components/CoinDetails/CoinDetails"

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coins" element={<Coins/>} />
          <Route path="/exchanges" element={<Exchanges/>} />
          <Route path="/coins/:id" element={<CoinDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
