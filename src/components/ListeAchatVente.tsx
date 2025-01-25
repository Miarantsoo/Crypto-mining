import {useEffect, useState} from "react";
import axiosInstance from "../api/AxiosConfig.ts";

const ListeAchatVente = () => {
    // const [user, setUser] = useState([])
    // const [dataUser, setDataUser] = useState([])

    // useEffect(() => {
    //     axiosInstance.get("/blabla")
    //         .then( (response: { data: never; }) => {
    //                 const valiny = response.data;
    //                 setUser(valiny)
    //             }
    //         )
    //         .catch(

    //         )
    // }, []);

    return (
        <div>
            Voici liste achat et vente des utilisateurs
        </div>
    )
}

export default ListeAchatVente;