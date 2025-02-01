import React, { useEffect, useState } from "react";
import { FaCoins, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { Alert } from "flowbite-react";
import { UserInterface } from "../../context/UserContext.tsx";
import api from "../../api/JavaAxiosConfig.ts";

type SoldeProps = {
  user: UserInterface;
};

const Solde: React.FC<SoldeProps> = ({ user }) => {
  const [somme, setSomme] = useState<number>(0);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "failure" } | null>(null);
  const [solde, setSolde] = useState<number>(0);

  const changeSomme = (n: number) => {
    setSomme(n);
  };

  const fetchSolde = async () => {
    try {
      const response = await api.get(`fond/donnee/${user?.id}`);
      setSolde(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleSubmit = async (actionType: "depot" | "retrait") => {
    const data = {
      id: user.id,
      somme: somme,
      daty: new Date(),
    };

    try {
      const response = await api.post(`fond/${actionType}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      setAlert({
        message: response.data.message,
        type: response.data.success ? "success" : "failure",
      });

      if (response.data.success) {
        // Refresh the balance by calling fetchSolde
        await fetchSolde();
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setAlert({
        message: error.response?.data?.message || "Une erreur est survenue lors de la soumission.",
        type: "failure",
      });
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSolde();
    }
  }, [user?.id]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      <div className="bg-gradient-to-br from-secondary to-main rounded-lg px-5 py-5 my-8 flex flex-col gap-5 w-full shadow-md">
        <div className="flex flex-row gap-5">
          <FaCoins className="text-light text-2xl" />
          <h1 className="font-body font-regular text-light text-2xl">
            Solde des fonds
          </h1>
        </div>
        <p className="text-light text-4xl font-body font-bold">
          {solde.toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          €
        </p>
        <div className="h-[1px] border-b border-b-lavender"></div>
        <form className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Somme en €"
            className="text-dark bg-light focus:ring-0 font-body rounded-lg"
            onChange={(e) => changeSomme(Number(e.target.value))}
          />
          <div className="flex flex-row gap-2 w-full">
            <button
              className="rounded-lg w-1/2 bg-secondary-500 hover:bg-secondary-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit("depot");
              }}
            >
              <FaCirclePlus />
              Dépôt
            </button>
            <button
              className="rounded-lg w-1/2 bg-red-500 hover:bg-red-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit("retrait");
              }}
            >
              <FaCircleMinus />
              Retrait
            </button>
          </div>
        </form>
      </div>

      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert 
            color={alert.type} 
            onDismiss={() => setAlert(null)}
            dismissible
          >
            <span className="font-medium">
              {alert.type === "success" ? "Succès" : "Erreur"} :
            </span>
            &nbsp;{alert.message}
          </Alert>
        </div>
      )}
    </>
  );
};

export default Solde;
