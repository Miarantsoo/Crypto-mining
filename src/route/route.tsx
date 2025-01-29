import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cours from "../components/cours/Cours";
import Login from "../components/access/Login";
import Signup from "../components/access/Signup";
import Access from "../pages/Access";
import CodeVerification from "../pages/CodeVerification";
import Portefeuille from "../components/achats-ventes/Portefeuille";
import ListeAchatVente from "../components/achats-ventes/ListeAchatVente";
import ProfilWrapper from "../pages/ProfilWrapper";
import ProfilModif from "../components/profil/ProfilModif";
import Profil from "../components/profil/Profil";

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
            {
                path: "portefeuille",
                element: <Portefeuille />,
            },
        ],
    },
    {
        path: "/profil",
        element: <ProfilWrapper />,
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
        element: <ListeAchatVente />
    },
]);