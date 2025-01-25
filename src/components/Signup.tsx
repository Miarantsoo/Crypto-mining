import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
            animate={{ opacity:1, rotateY: [180, 360] }}
            exit={{ rotateX: [0, 90] }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-50 w-full flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl"
        >
            <span className="font-bold text-4xl m-10 text-zinc-500">Inscrivez vous avec Connectify</span>
            <form 
                className="w-full flex items-center justify-center flex-col gap-5 p-10"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-1">
                    <input
                        className="w-full p-3 text-xl border rounded-lg"
                        type="text"
                        placeholder="Prenom"
                    />
                    <input 
                        className="w-full p-3 text-xl border rounded-lg"
                        type="text"
                        placeholder="Nom"
                    />
                </div>
                <span className="font-regular text-xl text-red-500">{errors.prenom && errors.prenom.message}</span>
                <div className="flex flex-row gap-1">
                    <input
                        className="w-full p-3 text-xl border rounded-lg"
                        type="date"
                        placeholder="Date de naissance"
                    />
                </div>
                <span className="font-regular text-xl text-red-500">{errors.prenom && errors.prenom.message}</span>

                <input 
                    {...register("mail", {
                        required: "L'adresse mail est requise",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Veuillez inserer un e-mail valide"
                        }
                    })}
                    className="w-full p-3 text-xl border rounded-lg"
                    type="text"
                    placeholder="Email"/>
                <span className="font-regular text-xl text-red-500">{errors.mail && errors.mail.message}</span>
                <input 
                    {...register("motDePasse", {
                        required: "Le mot de passe est requis"
                    })}
                    className="w-full p-3 text-xl border rounded-lg"
                    type="text" 
                    placeholder="Password"
                />
                <span className="font-regular text-xl text-red-500">{errors.motDePasse && errors.motDePasse.message}</span>
                <input 
                    {...register("verification", {
                        required: "La vérification du mot de passe est requise"
                    })}
                    className="w-full p-3 text-xl border rounded-lg"
                    type="text" 
                    placeholder="Password verification"
                />
                <span className="font-regular text-xl text-red-500">{errors.verification && errors.verification.message}</span>

                <button className="bg-slate-700 p-5 rounded-3xl w-1/5 h-16 flex items-center justify-center"><FaArrowRight className="text-white text-5xl" /></button>
            </form>
			<Link className="underline font-regular text-zinc-700" to={"/login"}>Vous avez déjà un compte? Connectez-vous ici</Link>
        </motion.div>
    );
};

export default Signup;