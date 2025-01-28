import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import Input from "../form/Input";
import axiosInstance from "../../api/AxiosConfig";
import { useErrorContext } from "../../context/ErrorContext";
import { MutatingDots } from "react-loader-spinner";
import { AxiosError } from "axios";

type FormFields = {
  email: string;
  mdp: string;
};

const Login: React.FC = () => {
  const context = useErrorContext();
  const navigate = useNavigate();

  const { setError } = context;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axiosInstance.post("/utilisateur/signin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/verification", {
        state: {
          id: response.data.data,
        },
      });
    } catch (error) {
      //@ts-ignore
      setError(error.response.data.error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotateY: [180, 360] }}
      exit={{ rotateX: [0, 90] }}
      transition={{ duration: 0.5 }}
      className="bg-light w-full flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl relative"
    >
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-slate-700/80 backdrop-blur-sm">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#1C32C4"
            secondaryColor="#D8E1FF"
            radius="14.5"
            ariaLabel="mutating-dots-loading"
            wrapperClass="mb-1"
          />
        </div>
      )}
      <span className="font-title uppercase text-4xl mx-5 mb-2 mt-5 text-dark">
        Connectez vous avec Connectify
      </span>
      <form
        className="w-full flex items-center justify-center flex-col gap-5 p-10"
        onSubmit={handleSubmit(onSubmit)}
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
      <Link className="underline font-body text-main" to={"/signup"}>
        Sans compte? Inscrivez-vous ici
      </Link>
    </motion.div>
  );
};

export default Login;
