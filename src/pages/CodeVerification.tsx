import Bg from "./../assets/img/bg.jpg"
import Homme from "./../assets/img/business-coffee.png"
import { AnimatePresence } from "framer-motion";
import { ErrorContext } from "../context/ErrorContext";
import { useEffect, useRef, useState } from "react";
import { Alert } from "flowbite-react"
import { HiInformationCircle } from "react-icons/hi";
import Verification from "../components/access/Verification";
import { useNavigate } from "react-router";

const CodeVerification: React.FC = () => {

    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (error) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setError("");
            }, 5000);

            if (error == "Un email de réinitialisation a été envoyé") {
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        }


        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [error]);

    return (
        <div
            className="w-full h-dvh bg-cover flex flex-row"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <div className="w-3/5 h-dvh mx-5 px-10 pt-2 overflow-hidden">
                <img className="w-full h-dvh object-contain" src={`${Homme}`} alt="illustration" />
            </div>
            <div className="w-2/5 my-20 mr-36 p-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <ErrorContext.Provider value={{ error, setError }}>
                        {error !== "" &&
                            <Alert
                                icon={HiInformationCircle}
                                color="failure"
                                onDismiss={() => {
                                    setError("");
                                    if (timeoutRef.current) {
                                        clearTimeout(timeoutRef.current);
                                    }
                                }}
                                className="fixed top-4 right-4 z-50"
                            >
                                {error}
                            </Alert>
                        }
                        <Verification />
                    </ErrorContext.Provider>
                </AnimatePresence>
            </div>
        </div >
    );
};

export default CodeVerification;