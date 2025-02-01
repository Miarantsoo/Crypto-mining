import React, { useEffect, useState } from "react";
import Bg from "../../assets/img/bg.jpg";
import GenericTable from "../generic/GenericTable";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

interface ICrytoData {
  id: number;
  nom: string;
  date: string;
}

const HistoriqueOperation: React.FC = () => {
  const [resultats, setResultats] = useState();

  const [cryptoData, setCryptoData] = useState<ICrytoData[]>();

  const [crypto, setCrypto] = useState<string>("1");

  const [first, setFirst] = useState<boolean>(false);

  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/crypto/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Crypto: ", data);
        setCryptoData(data);

        const initialCheckedItems = Array(data.length).fill(false);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            initialCheckedItems[i] = true;
          }
        }

        setTimeout(() => {
          setFirst(true);
        }, 1000);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (first) {
      fetchHistoriqueData();
    }
  }, [first]);

  const fetchHistoriqueData = async () => {
    try {
      const response = await fetch("http://localhost:8089/api/mvt-crypto/list");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Historique: ", data);
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

  const fetchResults = async () => {
    const data = {
      crypto: crypto,
      minDate: min,
      maxDate: max,
    };

    try {
      const response = await fetch(
        "http://localhost:8089/api/mvt-crypto/historique/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Réponse du serveur:", result);
      setResultats(result);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la date :", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchResults();
  };

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCrypto(event.target.value);
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(event.target.value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(event.target.value);
  };

  const navigation = useNavigate();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full px-8 py-8">
        <div className="mb-5 flex flex-row justify-between items-center">
          <div className="mb-5">
            <h1 className="font-title font-bold uppercase text-dark text-4xl">
              Historique des opérations
            </h1>
            <p className="font-body text-slate-500">
              Cette page liste l'entièreté des achats et ventes effectués par
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
        <form className="mb-5">
          <div className="w-fit flex flex-row gap-5">
            <div>
              <label
                htmlFor="type"
                className="font-body text-dark mb-2 text-base"
              >
                Crypto
              </label>
              <div className="flex flex-row">
                {cryptoData && cryptoData.length > 0 && (
                  <select
                    name="type"
                    id="type"
                    onChange={handleCryptoChange}
                    className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                  >
                    <option value="">Tous</option>
                    {cryptoData.map((crypt, index) => (
                      <option key={index} value={crypt.id}>
                        {crypt.nom}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="min"
                className="font-body text-dark mb-2 text-base"
              >
                Date Min
              </label>
              <div className="flex flex-row">
                <input
                  type="datetime-local"
                  id="min"
                  name="min"
                  value={min}
                  onChange={handleMinChange}
                  className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                  // required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="max"
                className="font-body text-dark mb-2 text-base"
              >
                Date Max
              </label>
              <div className="flex flex-row">
                <input
                  type="datetime-local"
                  id="max"
                  name="max"
                  value={max}
                  onChange={handleMaxChange}
                  className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                  // required
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-main text-light hover:bg-main-700 rounded-lg ml-0 font-body mt-5"
            >
              Valider
            </button>
          </div>
        </form>
        {resultats && resultats.length > 0 && (
          <GenericTable
            headers={[
              "Id Utilisateur",
              "Date",
              "Crypto",
              "Achat",
              "Vente",
              "Valeur",
            ]}
            tableContents={resultats.map((obj) => [
              {
                value: obj.idUser + "",
                redirect: `/historique-operation/${obj.idUser}`,
              },
              { value: new Date(obj.daty), redirect: null },
              { value: obj.idCrypto.nom, redirect: null },
              { value: obj.achat, redirect: null },
              { value: obj.vente, redirect: null },
              { value: obj.valeur, redirect: null },
            ])}
          />
        )}
      </div>
    </div>
  );
};

export default HistoriqueOperation;
