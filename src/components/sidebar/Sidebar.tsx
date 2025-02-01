import { FaWallet, FaChartLine } from "react-icons/fa6";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";
import {useUserContext} from "../../context/UserContext.tsx";

const Sidebar: React.FC = () => {
	const { user } = useUserContext();
	console.log("SidebarHeaderLog");
	console.log(user);
	const menu = [
		{icon: <FaChartLine className="w-7 h-6"/>, text: "Cours", direction: "/home/cours"},
		{icon: <FaWallet className="w-7 h-6"/>, text: "Portefeuille", direction: "portefeuille"}
	]

	return (<div className="h-[97dvh] m-3 p-3 rounded-2xl"> 
		<div className="border-b border-b-dark py-5">
			<SidebarHeader />
		</div>
		<div>
			<SidebarMenu menu={menu} />
		</div>
	</div>
	);
};

export default Sidebar;