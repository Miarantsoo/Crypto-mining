import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";

type FormFields = {
    prenom: string,
    nom: string,
    dateNaissance: Date,
    genre: number,
    mail: string,
    motDePasse: string,
    verification: string
}

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateY: [180, 360] }}
            exit={{ rotateX: [0, 90] }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-50 w-full flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl"
        >
            <span className="font-bold text-4xl m-10 text-zinc-500">Inscrivez vous avec Connectify</span>
            <form
                className="w-full flex items-center justify-center flex-col gap-5 p-10"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-1">
                    <Input
                        name="prenom"
                        type="text"
                        placeholder="Prenom"
                        formControl={register("prenom", { required: "Le prénom est requis" })}
                        errors={errors}
                    />
                    <Input
                        name="nom"
                        type="text"
                        placeholder="Nom"
                    />
                </div>
                <div className="flex flex-row gap-1 w-full">
                    <Input
                        name="dateNaissance"
                        type="date"
                        placeholder="Date de naissance"
                        formControl={register("dateNaissance", {required: "La date de naissance est requise", pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/,
                            message: "Veuillez inserer une date valide"
                        }})}
                        errors={errors}
                    />
                    <Select
                        name="genre"
                        placeholder="Votre genre"
                        formControl={register("genre", { required: "Veuillez sélectionner un genre", validate: (g) => g.toString() !== "Votre genre" })}
                        errors={errors}
                        options={[
                            {value: 1, label: "Homme"},
                            {value: 0, label: "Femme"},
                        ]}  
                    />
                </div>

				<Input 
					formControl={register("mail", {
						required: "L'adresse mail est requise",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Veuillez inserer un e-mail valide"
						}
					})}
					type="text"
					placeholder="Email" 
					name="mail" 
					errors={errors}/>
				<Input 
					formControl={register("motDePasse", {
						required: "Le mot de passe est requis"
					})}
					type="password"
					placeholder="Password"
					name="motDePasse"
					errors={errors}/>
				<Input 
					formControl={register("verification", {
						required: "La vérification du mot de passe est requise"
					})}
					type="password"
					placeholder="Password verification"
					name="verification"
					errors={errors}/>
                
                <button className="bg-slate-700 p-5 rounded-3xl w-1/5 h-16 flex items-center justify-center"><FaArrowRight className="text-white text-5xl" /></button>
            </form>
            <Link className="underline font-regular text-zinc-700" to={"/login"}>Vous avez déjà un compte? Connectez-vous ici</Link>
        </motion.div>
    );
};

export default Signup;