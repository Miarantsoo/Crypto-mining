import { AiOutlineLineChart, AiOutlineWallet } from "react-icons/ai";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";

const Sidebar: React.FC = () => {

	const menu = [
		{icon: <AiOutlineLineChart className="w-7 h-6"/>, text: "Cours", direction: "/home/cours"},
		{icon: <AiOutlineWallet className="w-7 h-6"/>, text: "Portefeuille", direction: "portefeuille"}
	]

	return (<div className="h-[97dvh] m-3 p-3 rounded-2xl"> 
		<div className="border-b border-b-dark py-2">
			<SidebarHeader />
		</div>
		<div>
			<SidebarMenu menu={menu} />
		</div>
	</div>
	);
};

export default Sidebar;