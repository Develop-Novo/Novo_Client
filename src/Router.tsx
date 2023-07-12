import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResetPassword from "./pages/ResetPasswordPage/ResetPasswordPage";

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}/`,
        children: [
            {
                path: "",
                element: <App />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "resetpassword",
                element: <ResetPassword />
            }
        ]
    }
])

export default router;
