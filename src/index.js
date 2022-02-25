import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserProvider from "./context/UserContext";
import UserDietProvider from "./context/UserDietContext";
import PageContext from "./context/PageContext";

ReactDOM.render(
  <React.StrictMode>
    <PageContext>
      <App />
    </PageContext>
  </React.StrictMode>,
  document.getElementById("root")
);
