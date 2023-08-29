import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import MainPage from "./pages/MainPage/MainPage";
import NovelPage from "./pages/NovelPage/NovelPage";
import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const host =
  window.location.hostname === "localhost"
    ? "http://52.78.121.235:8080/"
    : "api";

export const apiClient = axios.create({
  baseURL: host,
});

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path={`${process.env.PUBLIC_URL}/`}
        element={<LoginPage />}
      ></Route>
      <Route
        path={`${process.env.PUBLIC_URL}/register`}
        element={<RegisterPage />}
      ></Route>
      <Route
        path={`${process.env.PUBLIC_URL}/resetpassword`}
        element={<ResetPasswordPage />}
      ></Route>
      <Route
        path={`${process.env.PUBLIC_URL}/main`}
        element={<MainPage />}
      ></Route>
      <Route
        path={`${process.env.PUBLIC_URL}/novel/:id`}
        element={<NovelPage />}
      ></Route>
    </Routes>
  </BrowserRouter>
);
