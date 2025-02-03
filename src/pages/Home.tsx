import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Bg from "./../assets/img/bg.jpg"


// @ts-ignore
const Home: React.FC = () => {
    // const[ connectedUser, setConnectedUser ] = useState<Object | null>(null);

    return (
        <div
            className="flex flex-row bg-cover"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <aside className="w-1/5">
                <Sidebar />
            </aside>
            <main className="bg-light w-4/5 mr-3 my-3 p-5 rounded-3xl">
                <Outlet />
            </main>
        </div>
    );
};

export default Home;


