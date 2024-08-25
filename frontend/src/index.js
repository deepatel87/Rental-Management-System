import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import appStore from "./redux/appStore";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <Provider store={appStore}>
        <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
