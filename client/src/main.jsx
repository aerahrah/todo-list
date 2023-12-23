import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import React from "react";
import store from "./store/store.js";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>
  </Provider>
);
