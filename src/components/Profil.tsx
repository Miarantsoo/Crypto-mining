// import { useNavigate } from "react-router";

// const Profil: React.FC = () => {
//
//     const navigation = useNavigate();
//
//     return (
//     <div>
//         VOICI MON PROFIL
//         <button
//             onClick={() => navigation(-1)}
//         >
//             Retour
//         </button>
//     </div>
//   );
// };
//
// export default Profil;


import React from "react";

interface ProfilProps {
    name: string;
    position: string;
    followers: number;
    following: number;
    team: { id: number; image: string; name: string }[];
}

const Profil: React.FC<ProfilProps> = ({
                                                     name,
                                                     position,
                                                     followers,
                                                     following,
                                                 }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row max-w-4xl rounded-2xl shadow-xl overflow-hidden">
                {/* Left Section with Yellow Background */}
                <div className=" lg:w-96 lg:h-96 bg-yellow-400 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                        <h2 className="text-2xl font-bold">Welcome!</h2>
                        <p className="mt-2 text-lg">Profile Summary</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-2/3 bg-white p-6 flex flex-col justify-center">

                    <div className="mb-8">
                        <p className="text-gray-400 text-sm">Nom Prenom</p>
                        <p className="text-lg font-bold text-gray-700">Sweats Jenna</p>
                    </div>

                    <div className="mb-8">
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-lg font-bold text-gray-700">Jenna@gmail.com</p>
                    </div>

                    <div className="mb-8">
                        <p className="text-gray-400 text-sm">Adresse</p>
                        <p className="text-lg font-bold text-gray-700">Lot 61 IVG Andoharanofotsy</p>
                    </div>


                    <div className="flex justify-between mb-8">
                        <div>
                            <p className="text-gray-400 text-sm">Fond</p>
                            <p className="text-lg font-bold text-gray-700">650$</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Crypto</p>
                            <p className="text-lg font-bold text-gray-700">{following}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profil;

