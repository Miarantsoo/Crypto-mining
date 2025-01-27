import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Alert } from "flowbite-react";
import api from "../../api/JavaAxiosConfig";
import { HiInformationCircle } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";


const Portefeuille: React.FC = () => {
  interface PortfolioData {
    crypto: {
      id: number;
      nom: string;
      daty: string;
    };
    quantite: number;
    valeur: number;
  }

  interface FormData {
    idUser: number;
    idCrypto: number;
    quantite: number;
  }

  const [portefeuilleData, setPortefeuilleData] = useState<
    PortfolioData[] | null
  >(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PortfolioData | "valeurTotale" | "crypto.nom";
    direction: "asc" | "desc";
  } | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/mvt-crypto/wallet/1"); // Add your endpoint
      setPortefeuilleData(response.data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await api.post("/mvt-crypto/sell", data); // Add your POST endpoint
      setAlert({
        type: response.data.success ? "success" : "error",
        message: response.data.message,
      });
      fetchData();
    } catch (error) {
      setAlert({
        type: "error",
        message: "An error occurred while processing the request.",
      });
      console.error("Error submitting the form:", error);
    }
  };

  const handleSort = (
    key: keyof PortfolioData | "valeurTotale" | "crypto.nom"
  ) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = portefeuilleData
    ? [...portefeuilleData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const multiplier = direction === "asc" ? 1 : -1;

        if (key === "valeurTotale") {
          return multiplier * (a.valeur * a.quantite - b.valeur * b.quantite);
        }

        if (key === "crypto.nom") {
          return multiplier * a.crypto.nom.localeCompare(b.crypto.nom);
        }

        const valueA = a[key];
        const valueB = b[key];

        if (typeof valueA === "string" && typeof valueB === "string") {
          return multiplier * valueA.localeCompare(valueB);
        }
        if (typeof valueA === "number" && typeof valueB === "number") {
          return multiplier * (valueA - valueB);
        }

        return 0; // Fallback for other types (if any)
      })
    : null;

  const getSortIcon = (
    key: keyof PortfolioData | "valeurTotale" | "crypto.nom"
  ) => {
    if (!sortConfig || sortConfig.key !== key)
      return <FaSort className="inline ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="inline ml-1 text-gray-600" />
    ) : (
      <FaSortDown className="inline ml-1 text-gray-600" />
    );
  };

  if (!portefeuilleData) return <div>Loading...</div>;

  return (
    <div className="px-5 py-5">
      <div className="mb-5">
        <h1 className="font-title font-bold uppercase text-dark text-4xl">
          Portefeuille de cryptomonnaies
        </h1>
        <p className="font-body text-slate-500">
          Cette page recense la quantité de toutes les cryptomonnaies que vous
          possédez actuellement.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {alert && (
          <Alert
            color={alert.type === "success" ? "success" : "failure"}
            className="fixed bottom-4 left-4 z-50"
            icon={HiInformationCircle}
          >
            {alert.message}
          </Alert>
        )}
      </AnimatePresence>


      <div className="border rounded-lg overflow-hidden shadow-md">
        <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
          <thead className="border-b bg-lavender-50 border-b-lavender">
            <tr>
              <th
                className="p-4 w-1/6 text-lg text-main font-extrabold cursor-pointer"
                onClick={() => handleSort("crypto.nom")}
              >
                Crypto {getSortIcon("crypto.nom")}
              </th>
              <th
                className="p-4 w-1/6 text-lg text-main font-extrabold cursor-pointer"
                onClick={() => handleSort("valeur")}
              >
                Valeur Unitaire {getSortIcon("valeur")}
              </th>
              <th
                className="p-4 w-1/6 text-lg text-main font-extrabold cursor-pointer"
                onClick={() => handleSort("quantite")}
              >
                Quantité {getSortIcon("quantite")}
              </th>
              <th
                className="p-4 w-1/6 text-lg text-main font-extrabold cursor-pointer"
                onClick={() => handleSort("valeurTotale")}
              >
                Valeur Totale {getSortIcon("valeurTotale")}
              </th>
              <th className="p-4 w-2/6"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item) => (
              <tr key={item.crypto.id} className="border-b border-b-lavender">
                <td className="p-4 w-1/6">{item.crypto.nom}</td>
                <td className="p-4 w-1/6">{item.valeur.toLocaleString()} €</td>
                <td className="p-4 w-1/6">{item.quantite}</td>
                <td className="p-4 border-r border-r-lavender w-1/6">
                  {(item.valeur * item.quantite).toLocaleString()} €
                </td>
                <td className="p-4 w-2/6">
                  <form
                    className="flex items-center gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData: FormData = {
                        idUser: 1,
                        idCrypto: item.crypto.id,
                        quantite: parseFloat(
                          (
                            form.elements.namedItem(
                              "quantite"
                            ) as HTMLInputElement
                          ).value
                        ),
                      };
                      onSubmit(formData);
                    }}
                  >
                    <input type="hidden" name="idUser" value="1" />
                    <input
                      type="hidden"
                      name="idCrypto"
                      value={item.crypto.id}
                    />
                    <input
                      type="number"
                      name="quantite"
                      className="w-2/3 h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                      placeholder={`Quantité / ${item.quantite}`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-main text-light hover:bg-main-700 rounded-lg"
                    >
                      Vendre
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portefeuille;
