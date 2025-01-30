import React from "react";
import Bg from "../assets/img/bg.jpg";
import { Outlet } from "react-router";

const ProfilWrapper: React.FC = () => {
  return (
    <div
      className="flex flex-row justify-center py-5 px-5 bg-cover"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="min-h-dvh w-[90%] bg-light rounded-3xl flex flex-row overflow-x-hidden">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ProfilWrapper;
