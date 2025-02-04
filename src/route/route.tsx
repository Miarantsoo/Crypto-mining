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
import HistoriqueOperation from "../components/achats-ventes/HistoriqueOperation.tsx";
import HistoriqueOperationPerso from "../components/achats-ventes/HistoriqueOperationPerso.tsx";
import AnalyseCommission from "../components/analyse/AnalyseCommission.tsx";
import LoginAdmin from "../components/access/LoginAdmin.tsx";
import Demande from "../components/demmande/Demande.tsx";

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
                element: <Profil />
            },
            {
                path: "modif",
                element: <ProfilModif />
            }
        ]
    },
    {
        path: "/achats-ventes",
        element: <ListeAchatVente />
    },
    {
        path: "/filtre-achat-vente",
        element: <Home />,
        children: [
            {
                path: "",
                element: <FiltreAchatVente />
            }
        ]
    },
    {
        path: "/analyse-crypto",
        element: <Home />,
        children: [
            {
                path: "",
                element: <AnalyseCrypto />
            }
        ]
    },
    {
        path: "/historique-operation",
        element: <Home />,
        children: [
            {
                path: "",
                element: <HistoriqueOperation />
            },
            {
                path: ":idUser",
                element: <HistoriqueOperationPerso />
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
    {
        path: "/admin/demande",
        element: <StandaloneCard />,
        children: [
            {
                path: "",
                element: <Demande/>
            }
        ]
    },
]);