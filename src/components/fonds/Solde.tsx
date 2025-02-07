import React, { useEffect, useRef, useState } from "react";
import { FaCoins, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { Alert } from "flowbite-react";
import { UserInterface } from "../../context/UserContext.tsx";
import api from "../../api/JavaAxiosConfig.ts";
import { MutatingDots } from "react-loader-spinner";

type SoldeProps = {
  user: UserInterface;
};

const Solde: React.FC<SoldeProps> = ({ user }) => {
  const [somme, setSomme] = useState<number>(0);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "failure";
  } | null>(null);
  const [solde, setSolde] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setIsSubmitting(true); // Start submitting state

    const data = {
      id: user.id,
      somme: somme,
      daty: new Date(),
    };

    try {
      const response = await api.post(`demmande/${actionType}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({
        message: response.data.message,
        type: "success",
      });

      if (response.data.success) {
        // Refresh the balance by calling fetchSolde
        await fetchSolde();
      }

      setIsSubmitting(false);
    } catch (error: any) {
      console.error("Submission error:", error);
      setAlert({
        message:
          error.response?.data?.message ||
          "Une erreur est survenue lors de la soumission.",
        type: "failure",
      });
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSolde();
    }
  }, [user?.id]);

  useEffect(() => {
    if (alert) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setAlert(null);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [alert]);

  return (
    <>
      <div className="bg-gradient-to-br from-secondary to-main rounded-lg px-5 py-5 my-8 flex flex-col gap-5 w-full shadow-md relative">
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center rounded-lg justify-center bg-slate-700/80 backdrop-blur-sm z-50">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#1C32C4"
              secondaryColor="#D8E1FF"
              radius="14.5"
              ariaLabel="mutating-dots-loading"
              wrapperClass="mb-1"
            />
          </div>
        )}
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
            onDismiss={() => {
              setAlert(null);
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            }}
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
