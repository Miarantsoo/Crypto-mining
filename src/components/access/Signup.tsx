import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Select from "../form/Select";
import { useErrorContext } from "../../context/ErrorContext";
import axiosInstance from "../../api/AxiosConfig";
import { MutatingDots } from "react-loader-spinner";

type FormFields = {
  prenom: string;
  nom: string;
  dateNaissance: Date;
  genre: number;
  mail: string;
  motDePasse: string;
  verification: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const context = useErrorContext();
  const { setError, setType } = context;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/utilisateur/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });


      console.log(response.data);
      
      if (response.data.status === "success") {
        navigate("/login", {
            state: {
                id: {message: response.data.data.message, type: response.data.status}
            }
        })
      } else {
        setError(response.data.data.message);
        setType("failure");
      }
    } catch (error) {
      //@ts-ignore
      setError(error.response.data.error.message);
      setType("failure");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotateY: [180, 360] }}
      exit={{ rotateX: [0, 90] }}
      transition={{ duration: 0.5 }}
      className="bg-light w-full flex items-center flex-col justify-center h-10/12 rounded-2xl p-5 shadow-2xl"
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
        Inscrivez vous avec Connectify
      </span>
      <form
        className="w-full flex items-center justify-center p-5 gap-1 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-row gap-1">
          <Input
            name="prenom"
            type="text"
            placeholder="Prénom"
            formControl={register("prenom", {
              required: "Le prénom est requis",
            })}
            errors={errors}
          />
          <Input name="nom" type="text" placeholder="Nom" />
        </div>
        <div className="w-full flex flex-row gap-1">
          <Input
            name="dateNaissance"
            type="date"
            placeholder="Date de naissance"
            formControl={register("dateNaissance", {
              required: "La date de naissance est requise",
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "Veuillez inserer une date valide",
              },
            })}
            errors={errors}
          />
          <Select
            name="genre"
            placeholder="Votre genre"
            formControl={register("genre", {
              required: "Veuillez sélectionner un genre",
              validate: (value) => value !== -1,
            })}
            errors={errors}
            options={[
              { value: 1, label: "Homme" },
              { value: 0, label: "Femme" },
            ]}
          />
        </div>

        <Input
          formControl={register("mail", {
            required: "L'adresse mail est requise",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Veuillez inserer un e-mail valide",
            },
          })}
          type="text"
          placeholder="Email"
          name="mail"
          errors={errors}
        />
        {/* <div className="w-full flex flex-row gap-1"> */}
        <Input
          formControl={register("motDePasse", {
            required: "Le mot de passe est requis",
          })}
          type="password"
          placeholder="Password"
          name="motDePasse"
          errors={errors}
        />
        <Input
          formControl={register("verification", {
            required: "La vérification du mot de passe est requise",
          })}
          type="password"
          placeholder="Password verification"
          name="verification"
          errors={errors}
        />
        {/* </div> */}

        <div className="flex w-full align-center justify-end my-2">
          <button className="bg-main p-5 font-body rounded-3xl w-fit h-10 flex items-center justify-center text-light">
            Continuer <FaArrowRight className="text-light text-2xl ml-2" />
          </button>
        </div>
      </form>
      <Link className="underline font-body text-main" to={"/login"}>
        Vous avez déjà un compte? Connectez-vous ici
      </Link>
    </motion.div>
  );
};

export default Signup;
