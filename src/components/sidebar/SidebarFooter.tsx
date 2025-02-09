import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const SidebarFooter: React.FC = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }
    
    return (
        <div className="relative">
            <div className="absolute bottom-0 left-0 flex flex-row items-center gap-3 cursor-pointer hover:bg-light hover:text-main py-3 px-5 rounded-3xl" onClick={logout}>
                <CgLogOut className="w-10 h-10" />
                <p className="font-body text-lg">Se déconnecter</p>
            </div>
        </div>
    );
};

export default SidebarFooter;