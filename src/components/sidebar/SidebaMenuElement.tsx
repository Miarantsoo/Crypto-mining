import { Link, useLocation } from "react-router"

export interface SidebarMenuElementProps {
    icon: React.ReactNode
    text: string, 
    direction: string
}

const SidebarMenuElement: React.FC<SidebarMenuElementProps> = ({ icon, text, direction }) => {
    
    const location = useLocation();

    const verifLocation = location.pathname == direction
  
    return (
    <Link to={direction}>
        <li className={`flex items-start justify-start gap-3 px-5 py-3 m-1 transition duration-400 hover:bg-light hover:text-main rounded-3xl text-dark font-body text-lg cursor-pointer
        ${ verifLocation ? "bg-slate-300" : ""}
        `}>
        {icon}
        <span>{ text }</span>
        </li>
    </Link>
  );
};

export default SidebarMenuElement;