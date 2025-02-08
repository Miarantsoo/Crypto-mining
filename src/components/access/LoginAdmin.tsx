import Input from "../form/Input.tsx";
import { FaArrowRight } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MutatingDots } from "react-loader-spinner";
import axiosInstance from "../../api/AxiosConfig.ts";
import { useNavigate } from "react-router";
import { useErrorContext } from "../../context/ErrorContext.ts";

type FormFields = {
  email: string;
  mdp: string;
};

const LoginAdmin = () => {
  const context = useErrorContext();
  const { setError, setType } = context;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      const response = await axiosInstance.post("/utilisateur/signin/admin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {

        localStorage.setItem('adminLoggedIn', String(true));

        navigate("/admin/demande");
        
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
        Connectez vous en tant qu'administrateur
      </span>
      <form
        className="w-full flex items-center justify-center flex-col gap-5 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          formControl={register("email", {})}
          type="text"
          placeholder="Identifiant"
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
    </motion.div>
  );
};

export default LoginAdmin;
