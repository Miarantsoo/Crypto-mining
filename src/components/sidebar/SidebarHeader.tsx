import { Link } from "react-router";
import BlankProfile from "./../../assets/img/blank-profile.png";

const SidebarHeader: React.FC = () => {

  return (
    <div className="flex flex-row items-center justify-around gap-2">
      <div className="rounded-full w-16 cursor-pointer">
        <Link to="/profil">
          <img src={BlankProfile} alt="this is the profile" />
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="font-body text-dark text-lg">Hello 👋,</p>
        <p className="font-body font-extrabold text-dark text-lg">io aloha</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
