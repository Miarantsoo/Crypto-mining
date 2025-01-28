import React from "react";
import Pfp from "../../assets/img/pfp.jpg";
import { FaMars, FaVenus } from "react-icons/fa6";
import InfoSection from "./InfoSection";
import Solde from "../fonds/Solde";

type User = {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  genre: number;
  mail: string;
};

type ProfilProps = {
  user: User;
};

const Profil: React.FC<ProfilProps> = ({ user }) => {
  return (
    <div className="flex flex-row gap-5 w-5/6">
      <img src={Pfp} alt="" className="w-1/3 h-full object-cover" />
      <div className="px-5 py-8 w-2/3">
        <h1 className="font-title text-6xl font-bold uppercase text-dark">
          {user.prenom}
        </h1>
        <h1 className="font-title text-6xl font-bold uppercase text-dark flex flex-row items-center">
          {user.nom}
          <span className="ml-5 text-4xl">
            {user?.genre === 0 ? (
              <FaVenus className="text-secondary-300" />
            ) : user?.genre === 1 ? (
              <FaMars className="text-secondary-300" />
            ) : (
              <span className="text-gray-500">Unknown</span>
            )}
          </span>
        </h1>
        <InfoSection header={"Email"} content={user.mail}></InfoSection>
        <InfoSection header={"Date de naissance"} content={user.dateNaissance}></InfoSection>
        
        <Solde></Solde>
      </div>
    </div>
  );
};

export default Profil;
