import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import { useErrorContext } from "../../context/ErrorContext";
import axiosInstance from "../../api/AxiosConfig";
import { useLocation, useNavigate } from "react-router";
import { MutatingDots } from "react-loader-spinner";

interface VerificationId {
  id: {
    data: number;
    message: string;
  };
}

const Verification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataSent = location.state as VerificationId;
  const { setError } = useErrorContext();

  useEffect(() => {
    console.log(dataSent);

    if (dataSent?.id == null || undefined) {
      navigate("/login");
    }
  }, [dataSent, navigate]);

  const [code, setCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const verifyCode = async () => {
      if (code.length !== 6) return;

      setIsSubmitting(true);
      const numericCode = Number(code);

      try {
        const response = await axiosInstance.post(
          `/utilisateur/signin/confirmation/${dataSent.id.data}`,
          { code: numericCode },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        localStorage.setItem("token", response.data.data.data);


        navigate("/home");

        console.log(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "Verification failed. Please try again.";
        setError(errorMessage);
      }
    };

    verifyCode();
  }, [code]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotateY: [180, 360] }}
      exit={{ rotateX: [0, 90] }}
      transition={{ duration: 0.5 }}
      className="bg-light w-full flex items-center flex-col justify-center rounded-2xl px-5 py-7 shadow-2xl"
    >
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-700/80 backdrop-blur-sm z-50">
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
      <span className="font-bold font-body text-4xl m-5 text-dark text-center">
        Veuillez entrer le code de vérification
      </span>
      <div className="w-full flex items-center justify-center flex-col gap-5 p-10 font-body">
        <VerificationInput
          value={code}
          onChange={setCode}
          classNames={{
            container: "container",
            character: "character",
          }}
          validChars="0-9"
          inputProps={{ inputMode: "numeric" }}
          autoFocus={true}
        />
      </div>
    </motion.div>
  );
};

export default Verification;
