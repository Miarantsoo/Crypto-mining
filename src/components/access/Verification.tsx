import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input"
import { useErrorContext } from "../../context/ErrorContext";
import axiosInstance from "../../api/AxiosConfig";
import { useLocation, useNavigate } from "react-router";

interface VerificationId {
    id: {
        data: number,
        message: string
    }
}

const Verification: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dataSent = location.state as VerificationId;
    const { setError } = useErrorContext();

    useEffect(() => {
        console.log(dataSent);
        
        if(dataSent?.id == null || undefined) {
            navigate("/login");
        }
    }, [dataSent, navigate])

    const [code, setCode] = useState<string>("");

    useEffect(() => {
        const verifyCode = async () => {
            if (code.length !== 6) return; 
    
            const numericCode = Number(code);
    
            try {
                const response = await axiosInstance.post(
                    `/utilisateur/signin/confirmation/${dataSent.id.data}`,
                    { code: numericCode },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );
                localStorage.setItem('token', response.data.data.data);
                navigate("/home");

                console.log(response.data.data);
            } catch (error: any) {
                const errorMessage = error.response?.data?.error?.message || "Verification failed. Please try again.";
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
            className="bg-zinc-50 w-full flex items-center flex-col justify-center h-3/5 rounded-2xl p-5 shadow-2xl"
        >
            <span className="font-bold text-4xl m-10 text-zinc-500 text-center">Veuillez entrer le code de verification</span>
            <div
                className="w-full flex items-center justify-center flex-col gap-5 p-10"
            >
                <VerificationInput
                    value={code}
                    onChange={setCode}
                    classNames={{
                        container: "container",
                        character: "character",
                    }}
                    validChars="0-9"
                    inputProps={{ inputMode: "numeric" }} />
            </div>
        </motion.div>
    );
};

export default Verification;