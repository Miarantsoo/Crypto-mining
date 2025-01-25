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
			className="bg-light w-full flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl"
		>
			<span className="font-title uppercase text-4xl mx-5 mb-2 mt-5 text-dark">Connectez vous avec Connectify</span>
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
				<div className="flex w-full align-center justify-end my-2">
					<button className="bg-main p-5 font-body rounded-3xl w-fit h-10 flex items-center justify-center text-light">Continuer <FaArrowRight className="text-light text-2xl ml-2" /></button>
				</div>
			</form>
			<Link className="underline font-body text-main" to={"/signup"}>Sans compte? Inscrivez-vous ici</Link>
		</motion.div>
	);
};

export default Login;