import { FaWallet, FaChartLine, FaMagnifyingGlassDollar, FaMoneyBillTransfer, FaSackDollar, FaMoneyBills } from "react-icons/fa6";
import SidebarMenu from "./SidebarMenu";
import SidebarHeader from "./SidebarHeader";
import {useUserContext} from "../../context/UserContext.tsx";

const Sidebar: React.FC = () => {
	const { user } = useUserContext();
	console.log("Utilisateur dans Sidebar :", user);

	const menu = [
		{icon: <FaChartLine className="w-7 h-6"/>, text: "Cours", direction: "/home/cours"},
		{icon: <FaWallet className="w-7 h-6"/>, text: "Portefeuille", direction: "/home/portefeuille"},
		{icon: <FaMoneyBillTransfer className="w-7 h-6"/>, text: "Historique des opérations", direction: "/historique-operation"},
		{icon: <FaMoneyBills className="w-7 h-6"/>, text: "Somme des achats et ventes", direction: "/filtre-achat-vente"},
		{icon: <FaMagnifyingGlassDollar className="w-7 h-6"/>, text: "Analyse des cryptos", direction: "/analyse/crypto"},
		{icon: <FaSackDollar className="w-7 h-6"/>, text: "Analyse des commissions", direction: "/analyse/commissions"},
		{icon: <FaMoneyBills className="w-7 h-6"/>, text: "Favorie", direction: "/home/favorie"},

	]

	return (
		<div className="h-[97dvh] flex flex-col m-3 p-3 rounded-2xl">
			<div className="border-b border-b-dark py-5 flex-shrink-0">
				<SidebarHeader />
			</div>


			<div className="flex-1 overflow-y-auto 
				[&::-webkit-scrollbar]:hidden  /* Hide Chrome/Safari scrollbar */
				[scrollbar-width:none] /* Hide Firefox scrollbar */">
				<SidebarMenu menu={menu} />
			</div>
		</div>
	);
};

export default Sidebar;