import Lottie from "lottie-react"
import Sockets from "../assets/lottie/disco-sockets.json"
import Bg from "./../assets/img/bg.jpg";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";

const PageNotFound: React.FC = () => {

	const navigate = useNavigate()

	return (
		<div
			className="flex flex-row bg-cover min-h-screen overflow-auto"
			style={{ backgroundImage: `url(${Bg})` }}
		>
			<div className="w-2/4 h-dvh bg-transparent flex">
				<Lottie
					height={800}
					width={1000}
					animationData={Sockets} />
			</div>
			<div className="w-2/4 flex flex-col items-center justify-center">
				<div className="flex flex-col h-2/4">
					<span
						className="font-title text-[300px] text-center"
					>
						404
					</span>
					<span className="text-5xl mt-[-100px] font-body text-center">Page not found</span>
				</div>
				<div className="flex justify-center items-start h-2/4">
					<button
						className="mt-5 mx-7 bg-main hover:bg-main-700 px-12 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
						onClick={() => navigate(-1)}
					>
						<FaArrowLeft className="text-light text-2xl ml-2 inline-block" />
						Retour
					</button>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;