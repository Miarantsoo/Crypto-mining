import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaMars, FaVenus } from "react-icons/fa6";
import InfoSection from "./InfoSection";
import Solde from "../fonds/Solde";
import { useNavigate } from "react-router";
import { UserInterface } from "../../context/UserContext.tsx";
import axiosInstance from "../../api/AxiosConfig.ts";
import LoadingSpinner from "../../components/loading/LoadingDotsText";
import { AdvancedImage } from "@cloudinary/react";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen/index";

const Profil: React.FC = () => {
	const navigation = useNavigate();
	const [user, setUser] = useState<UserInterface | null>(null);

	let content;
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await axiosInstance.get(
					"/utilisateur/get-utilisateur",
					{
						headers: { "Content-type": "application/json" },
					}
				);

				if (result.data && result.data.data) {
					console.log("Utilisateur récupéré :", result.data.data.data);
					setUser(result.data.data.data as UserInterface);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération de l'utilisateur :",
					error
				);
			}
		};

		fetchUser();
	}, []);

	if (!user) {
		return <LoadingSpinner text="Chargement du profil..." />;
	}

	if (user && user.photoProfile !== "blank-profile_dshuxw") {
		const cld = new Cloudinary({ cloud: { cloudName: 'djaekualm' } });

		const img = cld
			.image(`${user?.photoProfile}`)
			.format('auto')
			.quality('auto')
			.resize(auto().gravity(autoGravity()).width(500).height(500));

		content = <AdvancedImage className="w-full h-full object-cover" cldImg={img} />
	} else {
		content = <div className="flex flex-col justify-center items-center text-3xl w-[100%] pr-16 pl-5 bg-zinc-200"><span className="text-wrap text-center">Pas encore de photo de profile?</span><span className="text-wrap text-center">Prenez-en une avec notre application mobile</span></div>
	}

	return (
		<div className="flex flex-row h-full justify-between w-full">
			<div className="flex flex-row justify-between gap-5 w-5/6">
				<div className="w-1/3">
					<div className="aspect-[3/4] h-full flex">
						{content}
					</div>
				</div>
				<div className="px-5 py-8 w-1/2 bg-light">
					<h1 className="font-title text-6xl font-bold uppercase text-dark">
						{user.prenom}
						{/* Mia */}
					</h1>
					<h1 className="font-title text-6xl font-bold uppercase text-dark flex flex-row items-center">
						{user.nom}
						{/* Aina */}
						<span className="ml-5 text-4xl">
							{user.genre === 0 ? (
								<FaVenus className="text-secondary-300" />
							) : user.genre === 1 ? (
								<FaMars className="text-secondary-300" />
							) : (
								<span className="text-gray-500">Inconnu</span>
							)}
						</span>
					</h1>
					<InfoSection header={"Email"} content={user.mail} />
					<InfoSection
						header={"Date de naissance"}
						content={new Date(user.dateNaissance).toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					/>
					<Solde user={user} />
				</div>
			</div>

			<div className="flex flex-col w-1/6">
				<button
					className="mt-5 mx-7 bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
					onClick={() => navigation(-1)}
				>
					<FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
					Retour
				</button>
				<button
					className="mt-5 mx-7 border border-main hover:border-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-main hover:text-main-700 gap-4"
					onClick={() => navigation("modif")}
				>
					Modifier le profil
				</button>
			</div>
		</div >
	);
};

export default Profil;
