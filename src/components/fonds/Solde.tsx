import React, {useState} from "react";
import { FaCoins, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import {UserInterface} from "../../context/UserContext.tsx";
import api from "../../api/JavaAxiosConfig.ts";

type SoldeProps = {
    user: UserInterface;
};

const Solde: React.FC<SoldeProps> = ({ user }) => {

    const [transactionValue,setTransactionValue]  = useState("");
    const [fond, setFonds] = useState<>("");


    const handleDepot = async () => {

        const response = await api.post(`fond/depot`, );

    };

  return (
    <div className="bg-gradient-to-br from-secondary to-main rounded-lg px-5 py-5 my-8 flex flex-col gap-5 w-full shadow-md">
      <div className="flex flex-row gap-5">
        <FaCoins className="text-light text-2xl"></FaCoins>
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
          values{transactionValue}
          onChange={(e) => setTransactionValue(e.target.value)}
          className="text-dark bg-light focus:ring-0 font-body rounded-lg"
        />
        <div className="flex flex-row gap-2 w-full">
          <button className="rounded-lg w-1/2 bg-secondary-500 hover:bg-secondary-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center">
            <FaCirclePlus></FaCirclePlus>
            Dépôt
          </button>
          <button className="rounded-lg w-1/2 bg-red-500 hover:bg-red-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center">
            <FaCircleMinus></FaCircleMinus>
            Retrait
          </button>
        </div>
      </form>
    </div>
  );
};

export default Solde;
