import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import appStore from "./redux/appStore";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <Provider store={appStore}>
      <Toaster></Toaster>
        <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
