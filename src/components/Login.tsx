import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa6"
import Input from "./form/Input";

type FormFields = {
	email: string,
	password: string
}


const Login: React.FC = () => {

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
			<span className="font-bold text-4xl m-10 text-zinc-500">Connectez vous avec Connectify</span>
			<form 
				className="w-full flex items-center justify-center flex-col gap-5 p-10"
				onSubmit={handleSubmit(onSubmit)}>
				<Input 
					formControl={register("email", {
						required: "L'adresse mail est requise",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Veuillez inserer un e-mail valide"
						}
					})}
					type="text"
					placeholder="Email" 
					name="email" 
					errors={errors}/>
				<Input 
					formControl={register("password", {
						required: "Le mot de passe est requis"
					})}
					type="password"
					placeholder="Password"
					name="password"
					errors={errors}/>
				<button className="bg-slate-700 p-5 rounded-3xl w-1/5 h-16 flex items-center justify-center"><FaArrowRight className="text-white text-5xl" /></button>
			</form>
			<Link className="underline font-regular text-zinc-700" to={"/signup"}>Sans compte? Inscrivez-vous ici</Link>
		</motion.div>
	);
};

export default Login;