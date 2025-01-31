import Bg from "../../assets/img/bg.jpg";
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

const HistoriqueOperationPerso = () => {

    const { idUser } = useParams();
    const [resultats, setResultats] = useState();

    useEffect(() => {
        const fetchHistoriquePersoData = async () => {
            try {
                const response = await fetch(  `http://localhost:8089/api/mvt-crypto/list/${idUser}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("HistoriquePerso: ", data);
                setResultats(data);

                const initialCheckedItems = Array(data.length).fill(false);
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        initialCheckedItems[i] = true;
                    }
                }
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        fetchHistoriquePersoData();
    }, []);

    return (
        <div
            className="w-full min-h-dvh bg-cover flex flex-row p-6"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <div className="bg-light rounded-lg w-full px-8 py-8">
                <div className="mb-5">
                    <h1 className="font-title font-bold uppercase text-dark text-4xl">
                        User {idUser}
                    </h1>
                </div>
                {resultats && resultats.length > 0 && (
                    <div className="mt-8 border rounded-lg overflow-hidden shadow-md">
                        <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
                            <thead className="border-b bg-lavender-50 border-b-lavender">
                            <tr>
                                <th className="p-4 text-lg text-main font-extrabold">Date</th>
                                <th className="p-4 text-lg text-main font-extrabold">Crypto</th>
                                <th className="p-4 text-lg text-main font-extrabold">Achat</th>
                                <th className="p-4 text-lg text-main font-extrabold">Vente</th>
                                <th className="p-4 text-lg text-main font-extrabold">Valeur</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultats.map((resultat, index) => (
                                <tr key={index} className="border-b border-b-lavender">
                                    <td className="p-4">{resultat.daty}</td>
                                    <td className="p-4">{resultat.idCrypto.nom}</td>
                                    <td className="p-4">{resultat.achat}</td>
                                    <td className="p-4">{resultat.vente}</td>
                                    <td className="p-4">{resultat.valeur}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoriqueOperationPerso;