import Bg from "../../assets/img/bg.jpg";
import Input from "../form/Input.tsx";
import { FaArrowRight } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
    email: string;
    mdp: string;
};

const LoginAdmin = () => {
    const {
        register,
        // handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>();

    return (
        <div
            className="w-full min-h-dvh bg-cover flex items-center justify-center"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <div
                className="bg-light w-5/12 flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl"
            >
        <span className="font-title uppercase text-4xl mx-5 mb-2 mt-5 text-dark">
          Connectez vous en tant qu'administrateur
        </span>
                <form
                    className="w-full flex items-center justify-center flex-col gap-5 p-10"
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        formControl={register("email", {
                            required: "L'adresse mail est requise",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Veuillez inserer un e-mail valide",
                            },
                        })}
                        type="text"
                        placeholder="Email"
                        name="email"
                        errors={errors}
                    />
                    <Input
                        formControl={register("mdp", {
                            required: "Le mot de passe est requis",
                        })}
                        type="password"
                        placeholder="Password"
                        name="mdp"
                        errors={errors}
                    />
                    <div className="flex w-full align-center justify-end my-2">
                        <button className="bg-main p-5 font-body rounded-3xl w-fit h-10 flex items-center justify-center text-light">
                            <div
                                className={`transition-opacity ${
                                    isSubmitting ? "opacity-0" : "opacity-100"
                                }`}
                            >
                                Continuer
                                <FaArrowRight className="text-light text-2xl ml-2 inline-block" />
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;