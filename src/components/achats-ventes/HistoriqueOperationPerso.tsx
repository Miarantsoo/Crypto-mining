import Bg from "../../assets/img/bg.jpg";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GenericTable from "../generic/GenericTable";
import { FaArrowLeft } from "react-icons/fa6";

const HistoriqueOperationPerso = () => {
  const { idUser } = useParams();
  const [resultats, setResultats] = useState();

  const navigation = useNavigate();

  useEffect(() => {
    const fetchHistoriquePersoData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8089/api/mvt-crypto/list/${idUser}`
        );
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
    <div className="w-full h-full flex flex-col px-8 py-8">
      <div className="mb-5 flex flew-row justify-between items-start">
        <div className="">
          <h1 className="font-title font-bold uppercase text-dark text-4xl">
            User {idUser}
          </h1>
          <p className="font-body text-slate-500">
            Cette page liste l'entièreté des achats et ventes effectués par tous
            les utilisateurs.
          </p>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
            onClick={() => navigation(-1)}
          >
            <FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
            Retour
          </button>
        </div>
      </div>
      {resultats && resultats.length > 0 && (
        <GenericTable
          headers={["Date", "Crypto", "Achat", "Vente", "Valeur"]}
          tableContents={resultats.map((obj) => [
            { value: new Date(obj.daty), redirect: null },
            { value: obj.idCrypto.nom, redirect: null },
            { value: obj.achat, redirect: null },
            { value: obj.vente, redirect: null },
            { value: obj.valeur, redirect: null },
          ])}
        />
        // <div className="mt-8 border rounded-lg overflow-hidden shadow-md">
        //   <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
        //     <thead className="border-b bg-lavender-50 border-b-lavender">
        //       <tr>
        //         <th className="p-4 text-lg text-main font-extrabold">Date</th>
        //         <th className="p-4 text-lg text-main font-extrabold">Crypto</th>
        //         <th className="p-4 text-lg text-main font-extrabold">Achat</th>
        //         <th className="p-4 text-lg text-main font-extrabold">Vente</th>
        //         <th className="p-4 text-lg text-main font-extrabold">Valeur</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {resultats.map((resultat, index) => (
        //         <tr key={index} className="border-b border-b-lavender">
        //           <td className="p-4">{resultat.daty}</td>
        //           <td className="p-4">{resultat.idCrypto.nom}</td>
        //           <td className="p-4">{resultat.achat}</td>
        //           <td className="p-4">{resultat.vente}</td>
        //           <td className="p-4">{resultat.valeur}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
    </div>
  );
};

export default HistoriqueOperationPerso;
