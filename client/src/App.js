import "./App.css";
import Payment from "./Payment";
import Completion from "./Completion";
import GoodList from "./GoodList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<GoodList />}
          />
          <Route
            path="/payment"
            element={<Payment />}
          />
          <Route
            path="/completion"
            element={<Completion />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
