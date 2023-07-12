import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/RegisterPage/RegisterPage";

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
                element: <Register />
            }
        ]
    }
])

export default router;
