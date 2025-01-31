import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cours from "../components/cours/Cours";
import Login from "../components/access/Login";
import Signup from "../components/access/Signup";
import Access from "../pages/Access";
import CodeVerification from "../pages/CodeVerification";
import Portefeuille from "../components/achats-ventes/Portefeuille";
import ListeAchatVente from "../components/achats-ventes/ListeAchatVente";
import StandaloneCard from "../pages/StandaloneCard";
import ProfilModif from "../components/profil/ProfilModif";
import Profil from "../components/profil/Profil";
import FiltreAchatVente from "../components/achats-ventes/FiltreAchatVente.tsx";
import AnalyseCrypto from "../components/analyse/AnalyseCrypto.tsx";
import AnalyseCommission from "../components/analyse/AnalyseCommission.tsx";
import LoginAdmin from "../components/access/LoginAdmin.tsx";

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
                path: "",
                element: <Cours />,
            },
            {
                path: "cours",
                element: <Cours />,
            },
            {
                path: "portefeuille",
                element: <Portefeuille />,
            },
        ],
    },
    {
        path: "/profil",
        element: <StandaloneCard />,
        children: [
            {
                path: "",
                element: <Profil user={{
                    id: 0,
                    nom: "Bebna",
                    prenom: "Boy",
                    dateNaissance: "2024-04-27",
                    genre: 1,
                    mail: "miarantsoasuper3000@gmail.com"
                }}></Profil>
            },
            {
                path: "modif",
                element: <ProfilModif />
            }
        ]
    },
    {
        path: "/achats-ventes",
        element: <StandaloneCard />,
        children: [
            {
                path: "",
                element: <ListeAchatVente />
            },
            {
                path: "filtre",
                element: <FiltreAchatVente />
            },
        ]
    },
    {
        path: "/analyse",
        element: <Home />,
        children: [
            {
                path: "crypto",
                element: <AnalyseCrypto />
            },
            {
                path: "commissions",
                element: <AnalyseCommission />
            },
        ]
    },
    {
        path: "/admin/login",
        element: <LoginAdmin />
    },
]);