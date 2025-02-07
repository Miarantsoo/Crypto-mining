import { Outlet, useLocation } from "react-router-dom";
import Bg from "./../assets/img/bg.jpg"
import Homme from "./../assets/img/business.png"
import { AnimatePresence } from "framer-motion";
import { ErrorContext } from "../context/ErrorContext";
import { useEffect, useRef, useState } from "react";
import { Alert } from "flowbite-react"
import { HiInformationCircle } from "react-icons/hi";


const Access: React.FC = () => {

    const [error, setError] = useState<string>("");
    const [type, setType] = useState<string>("");

    const location = useLocation();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (error) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setError("");
            }, 5000);
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
            <div className="w-1/2 h-dvh mx-5 px-10 pt-2 overflow-hidden">
                <img className="w-full h-dvh object-contain" src={`${Homme}`} alt="illustration" />
            </div>
            <div className="w-1/2 my-20 mr-36 p-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <ErrorContext.Provider value={{error, type, setType, setError}}>
                        {error !== "" &&
                            <Alert
                                icon={HiInformationCircle}
                                color={type}
                                onDismiss={() => {
                                    setError("");
                                    if (timeoutRef.current) {
                                        clearTimeout(timeoutRef.current);
                                    }
                                }}
                                className="fixed top-4 right-4 z-50 text-xl"
                            >
                                {error}
                            </Alert>
                        }
                    <Outlet key={location.pathname} />
                </ErrorContext.Provider>
            </AnimatePresence>
        </div>
        </div >
    );
};

export default Access;