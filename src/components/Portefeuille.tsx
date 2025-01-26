import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./form/Input";
import api from "../api/JavaAxiosConfig";

const Portefeuille: React.FC = () => {
  type CryptoFormFields = {
    idCrypto: number;
    idUser: number;
    quantite: number;
  };

  interface PortfolioData {
    crypto: {
      id: number;
      nom: string;
      daty: string;
    };
    quantite: number;
    valeur: number;
  }

  const [portefeuilleData, setPortefeuilleData] = useState<PortfolioData[] | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CryptoFormFields>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/mvt-crypto/wallet/1"); // Add your endpoint
        console.log(response);
        setPortefeuilleData(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<CryptoFormFields> = async (data) => {
    try {
      // await api.post("/your-sell-endpoint", data); // Update with your sell endpoint
      console.log(data);
      console.log("Sale successful");
    } catch (error) {
      console.error("Sale failed:", error);
    }
  };

  if (!portefeuilleData) return <div>Loading...</div>;

  return (
    <div className="px-5 py-2">
      <div className="mb-5">
        <h1 className="font-title font-bold uppercase text-slate-700 text-4xl">
          Portefeuille de cryptomonnaies
        </h1>
        <p className="font-regular text-slate-500">
          Cette page recense la quantité de toutes les cryptomonnaies que vous
          possédez actuellement.
        </p>
      </div>
      <table className="w-full text-left table-fixed min-w-max">
        <thead>
          <tr>
            <th className="p-4 border border-dark">
              <p className="block text-base uppercase antialiased font-regular leading-none text-dark">
                Crypto
              </p>
            </th>
            <th className="p-4 border border-dark">
              <p className="block text-base uppercase antialiased font-regular leading-none text-dark">
                Valeur
              </p>
            </th>
            <th className="p-4 border border-dark">
              <p className="block text-base uppercase antialiased font-regular leading-none text-dark">
                Quantité
              </p>
            </th>
            <th className="p-4">
            </th>
          </tr>
        </thead>
        <tbody>
          {portefeuilleData.map((item) => (
            <tr key={item.crypto.id}>
              <td className="p-4 border border-dark">
                <p className="block text-base leading-normal font-regular text-dark">
                  {item.crypto.nom}
                </p>
              </td>
              <td className="p-4 border border-dark">
                <p className="block text-base leading-normal font-regular text-dark">
                  {item.valeur.toLocaleString()} €
                </p>
              </td>
              <td className="p-4 border border-dark">
                <p className="block text-base leading-normal font-regular text-dark">
                  {item.quantite}
                </p>
              </td>
              <td className="p-4 border border-dark">
                <form
                  className="w-fit flex items-end justify-center flex-row gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    formControl={register("quantite", {
                      required: "La quantité est requise",
                      min: {
                        value: item.quantite,
                        message: `La quantité doit être supérieure ou égale à ${item.quantite}`,
                      },
                    })}
                    type="text"
                    placeholder="Quantité"
                    name="quantite"
                    errors={errors}
                    fullFormat={false}
                  />
                  <input type="hidden" name="idCrypto" value={item.crypto.id} />
                  <input type="hidden" name="idUser" value={1} />
                  <button className="bg-main p-5 font-body rounded-lg w-fit h-11 flex items-center justify-center text-light">
                    Vendre
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portefeuille;
