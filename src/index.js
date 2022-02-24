import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserProvider from "./context/UserContext";
import UserDietProvider from "./context/UserDietContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <UserDietProvider>
        <App />
      </UserDietProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
