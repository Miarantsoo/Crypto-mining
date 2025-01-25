import { Link } from "react-router";
import BlankProfile from "./../../assets/img/blank-profile.png"

const SidebarHeader: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full w-16 cursor-pointer">
                <Link to="/profil">
                    <img src={BlankProfile} alt="this is the profile" />
                </Link>
            </div>
            <div><p className="font-body text-dark text-lg">Your name</p></div>
        </div>
    );
};
    
export default SidebarHeader;