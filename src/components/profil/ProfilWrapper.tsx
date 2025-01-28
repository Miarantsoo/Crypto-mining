import React from "react";
import Bg from "../../assets/img/bg.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Profil from "./Profil";

const ProfilWrapper: React.FC = () => {
  const navigation = useNavigate();
  return (
    <div
      className="flex flex-row justify-center py-5 px-5 bg-cover"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="min-h-dvh w-[90%] bg-light rounded-3xl flex flex-row overflow-x-hidden">
        <Profil user={{
                  id: 0,
                  nom: "Boy",
                  prenom: "Bebna",
                  dateNaissance: "2005-04-27",
                  genre: 1,
                  mail: "miarantsoasuper3000@gmail.com"
              }}></Profil>
        <div className="flex flex-col w-1/6">
            <button
            className="mt-5 mx-7 bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
            onClick={() => navigation(-1)}
            >
            <FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
            Retour
            </button>

            <button
            className="mt-5 mx-7 border-2 border-main hover:border-main-700 px-5 py-3 font-body rounded-3xl w-max h-fit text-main hover:text-main-700"
            onClick={() => navigation("/modif-profil")}
            >
            Modifier le profil
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilWrapper;
