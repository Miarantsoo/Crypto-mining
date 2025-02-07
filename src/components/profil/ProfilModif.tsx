import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { UserInterface } from "../../context/UserContext";
import Blank from "../../assets/img/blank-profile.png";
import axiosInstance from "../../api/AxiosConfig";
import Pfp from "../../assets/img/pfp.jpg";
import LoadingSpinner from "../../components/loading/LoadingDotsText";
import {Cloudinary} from "@cloudinary/url-gen";
import {auto} from "@cloudinary/url-gen/actions/resize";
import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";
import {AdvancedImage} from "@cloudinary/react";

type FormFields = {
    nom: string;
    prenom: string;
    mdpSimple?: string;
    dateNaissance: string;
    genre: number;
};

type AlertType = {
    id: number;
    type: "success" | "error";
    message: string;
};

const ProfilModif: React.FC = () => {
    const navigation = useNavigate();
    const [user, setUser] = useState<UserInterface | null>(null);
    const [formData, setFormData] = useState<FormFields>({
        nom: "",
        prenom: "",
        dateNaissance: "",
        genre: 0,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alerts, setAlerts] = useState<AlertType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    let content;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axiosInstance.get("/utilisateur/get-utilisateur");
                if (result.data?.data?.data) {
                    const userData = result.data.data.data as UserInterface;
                    setUser(userData);
                    setFormData({
                        nom: userData.nom,
                        prenom: userData.prenom,
                        dateNaissance: new Date(userData.dateNaissance)
                            .toISOString()
                            .split("T")[0],
                        genre: userData.genre,
                    });
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const showAlert = (type: "success" | "error", message: string) => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const payload = { ...formData };
            if (!showPassword || !payload.mdpSimple) delete payload.mdpSimple;

            const response = await axiosInstance.post(
                `/utilisateur/update/${user.id}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === "success") {
                showAlert("success", response.data.data.message);
                setTimeout(() => navigation(-1), 2000);
            } else {
                showAlert(
                    "error",
                    response.data.data.message || "Une erreur est survenue"
                );
            }
        } catch (error: any) {
            showAlert(
                "error",
                error.response?.data?.message || "Erreur de connexion"
            );
            console.error("Update error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !user) {
        return <LoadingSpinner text="Chargement des données utilisateur..." />;
    }

    if (user && user.photoProfile !== "blank-profile_dshuxw") {
        const cld = new Cloudinary({cloud: {cloudName: 'djaekualm'}});

        const img = cld
            .image(`${user?.photoProfile}`)
            .format('auto')
            .quality('auto')
            .resize(auto().gravity(autoGravity()).width(500).height(500));

        content = <AdvancedImage className="w-full h-full object-cover" cldImg={img}/>
    } else {
        content = (
            <div className="flex flex-col justify-center items-center text-3xl w-[100%] pr-16 pl-5 bg-zinc-200"><span
                className="text-wrap text-center">Pas encore de photo de profile?</span><span
                className="text-wrap text-center">Prenez-en une avec notre application mobile</span>
            </div>);
    }


    return (
        <div className="flex flex-row h-full">
            {/* Alert notifications */}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className={`flex items-center p-4 rounded-lg shadow-lg ${
                            alert.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        <span>{alert.message}</span>
                        <button
                            onClick={() =>
                                setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                            }
                            className="ml-4 hover:opacity-70"
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex flex-row justify-between gap-5 w-5/6">
                <div className="w-1/3">
                    <div className="aspect-[3/4] h-full flex">
                        {content}
                    </div>
                </div>
                <div className="px-5 py-8 w-1/2">
                    <h1 className="font-title text-6xl font-bold uppercase text-dark mb-8">
                        Modifier le profil
                    </h1>
                    <form className="font-body" onSubmit={handleSubmit}>
                        <div className="mb-5 flex flex-row gap-5">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="nom" className="font-bold mb-2">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={"Miarantsoa"}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nom: e.target.value })
                                    }
                                    className="text-dark bg-light focus:ring-0 font-body rounded-lg p-2 border"
                                />
                            </div>

                            <div className="flex flex-col w-1/2">
                                <label htmlFor="prenom" className="font-bold mb-2">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={"Mia"}
                                    onChange={(e) =>
                                        setFormData({ ...formData, prenom: e.target.value })
                                    }
                                    className="text-dark bg-light focus:ring-0 font-body rounded-lg p-2 border"
                                />
                            </div>
                        </div>

                        <div className="mb-5 flex flex-row gap-5">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="dateNaissance" className="font-bold mb-2">
                                    Date de naissance
                                </label>
                                <input
                                    type="date"
                                    name="dateNaissance"
                                    value={formData.dateNaissance}
                                    onChange={(e) =>
                                        setFormData({ ...formData, dateNaissance: e.target.value })
                                    }
                                    className="text-dark bg-light focus:ring-0 font-body rounded-lg p-2 border"
                                />
                            </div>

                            <div className="flex flex-col w-1/2">
                                <label className="font-bold mb-2">Genre</label>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-row gap-2 items-center">
                                        <input
                                            className="h-4 w-4 text-main rounded-md"
                                            type="radio"
                                            name="genre"
                                            value="0"
                                            checked={formData.genre === 0}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    genre: parseInt(e.target.value),
                                                })
                                            }
                                        />
                                        <span>Femme</span>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <input
                                            className="h-4 w-4 text-main rounded-md"
                                            type="radio"
                                            name="genre"
                                            value="1"
                                            checked={formData.genre === 1}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    genre: parseInt(e.target.value),
                                                })
                                            }
                                        />
                                        <span>Homme</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <label className="font-bold">Modifier le mot de passe</label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-1 transition-transform duration-200 hover:bg-gray-100 rounded-full"
                                >
                                    <FaChevronRight
                                        className={`text-main transition-transform duration-200 ${
                                            showPassword ? "rotate-90" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                            {showPassword && (
                                <input
                                    type="password"
                                    name="mdpSimple"
                                    value={formData.mdpSimple || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, mdpSimple: e.target.value })
                                    }
                                    className="text-dark bg-light focus:ring-0 font-body rounded-lg p-2 border w-full"
                                    placeholder="Nouveau mot de passe"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-main hover:bg-main-700 px-8 py-3 font-body rounded-xl text-light text-lg flex items-center justify-center gap-2 ${
                                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 text-light"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sauvegarde en cours...
                                </>
                            ) : (
                                "Sauvegarder les modifications"
                            )}
                        </button>
                    </form>
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
            </div>
        </div>
    );
};

export default ProfilModif;
