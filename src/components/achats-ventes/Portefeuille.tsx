  import { useState, useEffect } from "react";
  import { SubmitHandler } from "react-hook-form";
  import api from "../../api/JavaAxiosConfig";

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

    const [portefeuilleData, setPortefeuilleData] = useState<PortfolioData[] | null>(
      null
    );

    const fetchData = async () => {
      try {
        const response = await api.get("/mvt-crypto/wallet/1"); // Add your endpoint
        console.log(response);
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
        console.log("Transaction successful:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
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
        <div className="border rounded-lg overflow-hidden shadow-md">
          <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
            <thead className="border-b bg-lavender-50 border-b-lavender">
              <tr className="">
                <th className="p-4 text-lg text-main font-extrabold">Crypto</th>
                <th className="p-4 text-lg text-main font-extrabold">Valeur</th>
                <th className="p-4 text-lg text-main font-extrabold">Quantité</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {portefeuilleData.map((item) => (
                <tr key={item.crypto.id} className="border-b border-b-lavender">
                  <td className="p-4 ">{item.crypto.nom}</td>
                  <td className="p-4 ">
                    {item.valeur.toLocaleString()} €
                  </td>
                  <td className="p-4 border-r border-r-lavender">{item.quantite}</td>
                  <td className="p-4 ">
                    <form
                      className="flex items-center gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData: FormData = {
                          idUser: 1,
                          idCrypto: item.crypto.id,
                          quantite: parseFloat(
                            (form.elements.namedItem("quantite") as HTMLInputElement).value
                          ),
                        };
                        onSubmit(formData);
                      }}
                    >
                      <input
                        type="hidden"
                        name="idUser"
                        value="1"
                      />
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
