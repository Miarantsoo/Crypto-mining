import React, { useEffect, useState } from "react";
import GenericTable from "../generic/GenericTable";
import api from "../../api/JavaAxiosConfig.ts";
import { useUserContext} from "../../context/UserContext.tsx";

type Favorie = {
    id: number;
    iduser: number;
    daty: string;
    idCrypto: {
        nom: string;
    };
};

const ListeFavorie: React.FC = () => {
    const [results, setResults] = useState<Favorie[]>([]);
    const { user } = useUserContext();
    console.log("Utilisateur List Favorie:", user);

    useEffect(() => {
        const fetchFavorie = async () => {
            try {
                const response = await api.get(`favorie/list`, {
                    params: { userId: user?.id }, // Pass userId as a query parameter
                });
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorie();
    }, []); // Add user.id to the dependency array

    return (
        results.length > 0 && (
            <GenericTable
                headers={[
                    "Id Utilisateur",
                    "Date",
                    "Crypto",
                ]}
                tableContents={results.map((obj) => [
                    { value: obj.iduser, redirect: null },
                    { value: new Date(obj.daty).toLocaleDateString(), redirect: null }, // Format date
                    { value: obj.idCrypto.nom, redirect: null },
                    // { value: obj.idCrypto., redirect: null },
                ])}
            />
        )
    );
};

export default ListeFavorie;