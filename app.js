import { useState, useEffect } from "react";
import "./App.css";
import { FGData, FGForm, ThankYouNote, EmptyList } from "./components";
import { reactLocalStorage } from "reactjs-localstorage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    let orderData = reactLocalStorage.getObject("order");
    setOrder(orderData);
  }, []);

  useEffect(() => {
    if (Object.keys(order).length)
      reactLocalStorage.setObject("order", order);
  }, [order]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <FGForm
                order={order}
                setOrder={setOrder}
              />
            }
          />

          <Route
            exact
            path="/order-data"
            element={
              <FGData
                order={order}
                setOrder={setOrder}
              />
            }
          />

          <Route exact path="/submit-order" element={<ThankYouNote />} />

          <Route exact path="/empty-list" element={<EmptyList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
