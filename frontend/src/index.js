import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authProvide";
import  UserInfoProvider  from "./context/LoginProvider";

const h = ReactDOM.createRoot(document.getElementById("root"));
h.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInfoProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserInfoProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
