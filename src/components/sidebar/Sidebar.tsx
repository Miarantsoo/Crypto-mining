import { FaWallet, FaChartLine, FaMagnifyingGlassDollar, FaMoneyBillTransfer, FaSackDollar } from "react-icons/fa6";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";

const Sidebar: React.FC = () => {

	const menu = [
		{icon: <FaChartLine className="w-7 h-6"/>, text: "Cours", direction: "/home/cours"},
		{icon: <FaWallet className="w-7 h-6"/>, text: "Portefeuille", direction: "/home/portefeuille"},
		{icon: <FaMoneyBillTransfer className="w-7 h-6"/>, text: "Achats et ventes", direction: "/achats-ventes"},
		{icon: <FaMagnifyingGlassDollar className="w-7 h-6"/>, text: "Analyse des cryptos", direction: "/analyse/crypto"},
		{icon: <FaSackDollar className="w-7 h-6"/>, text: "Analyse des commissions", direction: "/analyse/commissions"},
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