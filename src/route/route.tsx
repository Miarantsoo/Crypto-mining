import { createBrowserRouter, Navigate } from "react-router-dom";
import Profil from "../components/Profil";
import Home from "../pages/Home";
import Cours from "../components/Cours";
import Login from "../components/access/Login";
import Signup from "../components/access/Signup";
import Access from "../pages/Access";
import CodeVerification from "../pages/CodeVerification";

export const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <Access />,
        children: [
            {
                index: true,
                element: (
                    <Navigate to="/login" replace />
                ),
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            }
        ]
    },
    {
        path: "/verification",
        element: <CodeVerification />
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "cours",
                element: <Cours />,
            },
        ],
    },
    {
        path: "/profil",
        element: <Profil />
    }
]);