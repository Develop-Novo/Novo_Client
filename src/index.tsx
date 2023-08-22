import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import MainPage from "./pages/MainPage/MainPage";
import NovelPage from "./pages/NovelPage/NovelPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="register" element={<RegisterPage />}></Route>
      <Route path="resetpassword" element={<ResetPasswordPage />}></Route>
      <Route path="main" element={<MainPage />}></Route>
      <Route path="novel" element={<NovelPage />}></Route>
    </Routes>
  </BrowserRouter>
);
