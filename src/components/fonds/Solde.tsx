import React, { useState } from "react";
import { FaCoins, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { Alert } from "flowbite-react";
import { UserInterface } from "../../context/UserContext.tsx";
import api from "../../api/JavaAxiosConfig.ts";

type SoldeProps = {
  user: UserInterface;
};

const Solde: React.FC<SoldeProps> = ({ user }) => {
  const [somme, setSomme] = useState<number>(0);
  const [action, setAction] = useState<string>("depot");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "failure" } | null>(null);

  const changeSomme = (n: number) => {
    setSomme(n);
  };

  const handleSubmit = async () => {
    const data = {
      id: user.id,
      somme: somme,
      daty: new Date(),
    };

    try {
      const response = await api.post(`fond/${action}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      // Set the alert message and type based on response.data.success
      setAlert({
        message: response.data.message,
        type: response.data.success ? "success" : "failure",
      });
    } catch (error: any) {
      // Optionally handle errors from the request
      console.error("Submission error:", error);
      setAlert({
        message: "Une erreur est survenue lors de la soumission.",
        type: "failure",
      });
    }
  };

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
          10 600 000,50 €
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
                e.preventDefault(); // Prevent form submission
                setAction("depot");
                handleSubmit();
              }}
            >
              <FaCirclePlus />
              Dépôt
            </button>
            <button
              className="rounded-lg w-1/2 bg-red-500 hover:bg-red-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                setAction("retrait");
                handleSubmit();
              }}
            >
              <FaCircleMinus />
              Retrait
            </button>
          </div>
        </form>
      </div>
      {/* Alert positioned at the bottom right */}
      {alert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert color={alert.type}>
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
