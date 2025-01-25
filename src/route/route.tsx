import { createBrowserRouter, Navigate } from "react-router-dom";
import Profil from "../components/Profil";
import Home from "../pages/Home";
import Cours from "../components/Cours";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Access from "../pages/Access";

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