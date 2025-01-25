import { Outlet, useLocation } from "react-router-dom";
import Bg from "./../assets/img/bg.jpg"
import Homme from "./../assets/img/business.png"
import { AnimatePresence } from "framer-motion";

const Access: React.FC = () => {

    const location = useLocation();

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
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Access;