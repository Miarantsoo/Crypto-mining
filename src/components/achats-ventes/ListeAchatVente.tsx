/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import api from "../../api/JavaAxiosConfig.ts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";

const ListeAchatVente = () => {
  interface AchatsVentesData {
    id: number;
    idCrypto: {
      id: number;
      nom: string;
      daty: string;
    };
    idUser: number;
    achat: number;
    vente: number;
    daty: string;
    valeur: number;
  }

  const navigation = useNavigate();

  const [vaData, setVaData] = useState<AchatsVentesData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/mvt-crypto/list"); // Add your endpoint
        setVaData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  if (!vaData) return <div>Loading...</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col w-full items-end"></div>
      <div className="w-full px-8 py-8">
        <div className="mb-5 flex flex-row justify-between items-center">
          <div className="">
            <h1 className="font-title font-bold uppercase text-dark text-4xl">
              Liste des transactions de cryptomonnaies
            </h1>
            <p className="font-body text-slate-500">
              Cette page liste l'entièreté des achats et ventes effectués par
              tous les utilisateurs.
            </p>
          </div>
          <div className="flex flex-col">
            <button
              className="mt-5 mx-7 bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
              onClick={() => navigation(-1)}
            >
              <FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
              Retour
            </button>

            <button
              className="mt-2 mx-7 border-2 border-main hover:border-main-700 px-5 py-3 font-body rounded-3xl w-max h-fit text-main hover:text-main-700"
              onClick={() => navigation("filtre")}
            >
              Voir le total
            </button>
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden shadow-md">
          <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
            <thead className="border-b bg-lavender-50 border-b-lavender">
              <tr className="">
                <th className="p-4 text-lg text-main font-extrabold">
                  Utilisateur
                </th>
                <th className="p-4 text-lg text-main font-extrabold">Date</th>
                <th className="p-4 text-lg text-main font-extrabold">Crypto</th>
                <th className="p-4 text-lg text-main font-extrabold">
                  Valeur à la transaction
                </th>
                <th className="p-4 text-lg text-main font-extrabold">Achats</th>
                <th className="p-4 text-lg text-main font-extrabold">Ventes</th>
              </tr>
            </thead>
            <tbody>
              {vaData.map((item) => (
                <tr
                  key={item.idCrypto.id}
                  className="border-b border-b-lavender"
                >
                  <td className="p-4 ">{item.idUser}</td>
                  <td className="p-4 ">
                    {format(new Date(item.daty), "d MMMM yyyy", { locale: fr })}
                  </td>
                  <td className="p-4">{item.idCrypto.nom}</td>
                  <td className="p-4 ">{item.valeur} €</td>
                  <td className="p-4">{item.achat}</td>
                  <td className="p-4">{item.vente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListeAchatVente;
