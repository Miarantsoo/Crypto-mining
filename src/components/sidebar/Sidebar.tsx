import { FaWallet, FaChartLine, FaMoneyBillTransfer } from "react-icons/fa6";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";

const Sidebar: React.FC = () => {

	const menu = [
		{icon: <FaChartLine className="w-7 h-6"/>, text: "Cours", direction: "/home/cours"},
		{icon: <FaWallet className="w-7 h-6"/>, text: "Portefeuille", direction: "portefeuille"},
		{icon: <FaMoneyBillTransfer className="w-7 h-6"/>, text: "Achats et ventes", direction: "/achats-ventes"},
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