import React, {useEffect, useState} from 'react';
import Bg from "../../assets/img/bg.jpg";

const FiltreAchatVente: React.FC = () => {
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [dateHeure, setDateHeure] = useState<string>(getCurrentDateTime);
    const [resultats, setResultats] = useState<any[] | null>(null); // État pour stocker les résultats

    const handleDateHeureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateHeure(event.target.value);
    };

    const fetchResults = async (selectedDate: string) => {
        console.log('Date et heure sélectionnées :', selectedDate);

        const data = { dateHeure: selectedDate };

        try {
            const response = await fetch('http://localhost:8089/api/mvt-crypto/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('Réponse du serveur:', result);
            setResultats(result);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la date :', error);
            setResultats(null);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchResults(dateHeure);
    };

    useEffect(() => {
        fetchResults(dateHeure);
    }, []);

    return (
        <div
            className="w-full min-h-dvh bg-cover flex flex-row p-6 "
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <div className="bg-light rounded-lg w-full px-8 py-8">
                <div className="mb-5">
                    <h1 className="font-title font-bold uppercase text-dark text-4xl">
                        Somme des achats et ventes
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="w-fit flex flex-col gap-1 ">
                        <label htmlFor="dateHeure" className="font-body text-dark mb-2 text-base">
                            Date et heure Max
                        </label>
                        <div className=" flex flex-row">
                            <input
                                type="datetime-local"
                                id="dateHeure"
                                name="dateHeure"
                                className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                                value={dateHeure}
                                onChange={handleDateHeureChange}
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-main text-light hover:bg-main-700 rounded-lg ml-5 font-body"
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                </form>

                {resultats && resultats.length > 0 && (
                    <div className="mt-8 border rounded-lg overflow-hidden shadow-md">
                        <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
                            <thead className="border-b bg-lavender-50 border-b-lavender">
                            <tr>
                                <th className="p-4 text-lg text-main font-extrabold">ID Utilisateur</th>
                                <th className="p-4 text-lg text-main font-extrabold">Total Achat</th>
                                <th className="p-4 text-lg text-main font-extrabold">Total Vente</th>
                                <th className="p-4 text-lg text-main font-extrabold">Portefeuille</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultats.map((resultat, index) => (
                                <tr key={index} className="border-b border-b-lavender">
                                    <td className="p-4">{resultat.idUser}</td>
                                    <td className="p-4">{resultat.totalAchat}</td>
                                    <td className="p-4">{resultat.totalVente}</td>
                                    <td className="p-4">{resultat.portefeuille}</td>
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

export default FiltreAchatVente;