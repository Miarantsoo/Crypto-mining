import React, { useEffect, useState } from "react";
import api from "../../api/JavaAxiosConfig.ts";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import GenericTable from "../generic/GenericTable.tsx";

type TotalTransaction = {
  idUser: number;
  totalAchat: number;
  totalVente: number;
  portefeuille: number;
};

const FiltreAchatVente: React.FC = () => {
  const navigation = useNavigate();

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [dateHeure, setDateHeure] = useState<string>(getCurrentDateTime);
  const [resultats, setResultats] = useState<TotalTransaction[] | null>(null); // État pour stocker les résultats

  const handleDateHeureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateHeure(event.target.value);
  };

  const fetchResults = async (selectedDate: string) => {
    const data = { dateHeure: selectedDate };

    try {
      const response = await api.post("/mvt-crypto/search", data);

      // const result = await response.data;
      // console.log("Réponse du serveur:", response.data);
      setResultats(response.data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la date :", error);
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
    <div className="w-full h-full flex flex-col">
      <div className="w-full px-8 py-8">
        <div className="mb-5 flex flex-row justify-between items-center">
          <div className="">
            <h1 className="font-title font-bold uppercase text-dark text-4xl">
              Somme des achats et ventes
            </h1>
            <p className="font-body text-slate-500">
              Cette page liste la somme des achats et ventes effectués par
              tous les utilisateurs.
            </p>
          </div>
          {/* <div className="flex flex-col">
            <button
              className="mt-5 mx-7 bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
              onClick={() => navigation(-1)}
            >
              <FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
              Retour
            </button>
          </div> */}
        </div>
        <div className="mb-5">
          <form onSubmit={handleSubmit}>
            <div className="w-fit flex flex-col gap-1 ">
              <label
                htmlFor="dateHeure"
                className="font-body text-dark mb-2 text-base"
              >
                Date et heure maximum
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
        </div>
        <GenericTable
            headers={["Utilisateur", "Total des achats", "Total des ventes", "Portefeuille"]}
            tableContents={resultats?.map((obj) => [
              { value: obj.idUser + "", redirect: null }, 
              { value: obj.totalAchat, redirect: null },  
              { value: obj.totalVente, redirect: null },  
              { value: obj.portefeuille, redirect: null },  
            ])}
          />
      </div>
    </div>
  );
};

export default FiltreAchatVente;
