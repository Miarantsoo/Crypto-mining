import React from "react";
import Bg from "../../assets/img/bg.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

type FormFields = {
	nom: string,
	prenom: string,
	mdpSimple: string,
    dateNaissance: string,
    genre: number,
}

const ProfilModif: React.FC = () => {
  const navigation = useNavigate();
  return (

    <div className="flex flex-col w-1/6">
        <button
        className="mt-5 mx-7 bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
        onClick={() => navigation(-1)}
        >
        <FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
        Retour
        </button>
    </div>

  );
};

export default ProfilModif;
