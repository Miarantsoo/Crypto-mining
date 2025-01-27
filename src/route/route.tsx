import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cours from "../components/Cours";
import Login from "../components/access/Login";
import Signup from "../components/access/Signup";
import Access from "../pages/Access";
import CodeVerification from "../pages/CodeVerification";
import Portefeuille from "../components/achats-ventes/Portefeuille";
import ListeAchatVente from "../components/achats-ventes/ListeAchatVente";
import ProfilWrapper from "../components/profil/ProfilWrapper";

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
        element: <ProfilWrapper />
    },
    {
        path: "/achats-ventes",
        element: <ListeAchatVente />
    },
]);