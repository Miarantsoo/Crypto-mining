import React, { useEffect, useState } from "react";
import GenericTable from "../generic/GenericTable";
import api from "../../api/JavaAxiosConfig.ts";
import { useUserContext } from "../../context/UserContext.tsx";

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
    <div className="relative w-full mx-auto flex flex-col justify-center px-5 py-5">
      <div className="mb-5">
        <h1 className="font-title font-bold text-3xl text-dark uppercase">
          Favoris
        </h1>
        <p className="font-body text-slate-500 text-base">
          Cette page vous montre vos cryptos favoris.
        </p>
      </div>
      {results.length > 0 && (
        <GenericTable
          headers={["Date d'ajout", "Crypto"]}
          tableContents={results.map((obj) => [
            { value: new Date(obj.daty), redirect: null }, // Format date
            { value: obj.idCrypto.nom, redirect: null },
            // { value: obj.idCrypto., redirect: null },
          ])}
        />
      )}
    </div>
  );
};

export default ListeFavorie;
