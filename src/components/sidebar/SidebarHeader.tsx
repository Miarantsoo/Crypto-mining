import { Link } from "react-router";
import { useUserContext } from "../../context/UserContext.tsx";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const SidebarHeader: React.FC = () => {
	const { user } = useUserContext();
	console.log("Utilisateur dans Sidebar Header:", user);

	const cld = new Cloudinary({ cloud: { cloudName: 'djaekualm' } });

	const img= cld
		.image(`${user?.photoProfile}`)
		.format('auto') 
		.quality('auto')
		.resize(auto().gravity(autoGravity()).width(500).height(500));

	return (
		<div className="flex flex-row items-center justify-around gap-2">
			<div className="rounded-full overflow-hidden w-16 cursor-pointer">
				<Link to="/profil">
					{/* <img src={BlankProfile} alt="this is the profile" /> */}
					<AdvancedImage cldImg={img}/>
				</Link>
			</div>
			<div className="flex flex-col">
				<p className="font-body text-dark text-lg">Hello 👋,</p>
				<p className="font-body font-extrabold text-dark text-lg">{user?.prenom}</p>
			</div>
		</div>
	);
};

export default SidebarHeader;
