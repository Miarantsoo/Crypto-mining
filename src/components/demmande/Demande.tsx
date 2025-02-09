import { useEffect, useState } from "react";
import api from "../../api/JavaAxiosConfig.ts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router";

interface demandesI {
  id: number;
  iduser: number;
  depot: number;
  retrait: number;
  daty: string;
  etat: number;
}
const Demande = () => {
  const [demandes, setDemandes] = useState<demandesI[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/demmande/");
      setDemandes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const validate = async (index) => {
    try {
      console.log(`/demmande/validation/${index}`);
      const response = await api.get(`/demmande/validation/${index}`);
      console.log(response);

      fetchData();
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const deny = async (index) => {
    try {
      console.log(`/demmande/refus/${index}`);
      const response = await api.get(`/demmande/refus/${index}`);
      console.log(response);

      fetchData();
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  const [isAdmingLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const logInfo = localStorage.getItem("adminLoggedIn");
    if (logInfo === undefined || logInfo === null) {
      setIsAdminLoggedIn(false);
    } else {
      setIsAdminLoggedIn(Boolean(logInfo));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  if (isAdmingLoggedIn) {

    return (
      <div className="w-full h-full flex flex-col px-8 py-8">
        <div className="w-full">
          <div className="mb-5 flex flex-row justify-between items-center">
            <div className="">
              <h1 className="font-title font-bold uppercase text-dark text-4xl">
                Liste des demandes
              </h1>
              <p className="font-body text-slate-500">
                Cette page liste l'entièreté des demandes effectués par tous les
                utilisateurs.
              </p>
            </div>
          </div>
        </div>
        {demandes && demandes.length > 0 && (
          <div className="border rounded-lg overflow-hidden shadow-md">
            <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
              <thead className="border-b bg-lavender-50 border-b-lavender">
                <tr className="">
                  <th className="p-4 text-lg text-main font-extrabold">
                    Utilisateur
                  </th>
                  <th className="p-4 text-lg text-main font-extrabold">Date</th>
                  <th className="p-4 text-lg text-main font-extrabold">
                    Depot
                  </th>
                  <th className="p-4 text-lg text-main font-extrabold">
                    Retrait
                  </th>
                  <th className="p-4 text-lg text-main font-extrabold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {demandes.map((item) => (
                  <tr key={item.id} className="border-b border-b-lavender">
                    <td className="p-4 ">{item.iduser}</td>
                    <td className="p-4 ">
                      {format(new Date(item.daty), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                    <td className="p-4">{item.depot} €</td>
                    <td className="p-4 ">{item.retrait} €</td>
                    <td className="p-4 flex flex-row gap-5">
                      <button
                        className="px-5 py-3 rounded-lg bg-secondary-500 hover:bg-secondary-600 text-light"
                        onClick={() => validate(item.id)}
                      >
                        Valider
                      </button>
                      <button
                        className="px-5 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-light"
                        onClick={() => deny(item.id)}
                      >
                        Refuser
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  } else {
    navigate("/admin/login");
  }
};

export default Demande;
