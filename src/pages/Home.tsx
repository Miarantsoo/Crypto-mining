import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Bg from "./../assets/img/bg.jpg"
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosConfig";


// @ts-ignore
const Home: React.FC = () => {
    const[ connectedUser, setConnectedUser ] = useState<Object | null>(null);

    useEffect(() => {
        // console.log("qfe");

        const getUser = async () => {
            const result = await axiosInstance.post('/utilisateur/get-utilisateur', {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            // console.log();
            setConnectedUser(result.data.data.data);
        } 

        getUser();
        
        // console.log(connectedUser);
        
    }, [connectedUser]);

    return (
        <div
            className="flex flex-row bg-cover"
            style={{ backgroundImage: `url(${Bg})` }}
        >
            <aside className="w-1/5">
                <Sidebar />
            </aside>
            <main className="bg-light w-4/5 h-[97dvh] mr-3 my-3 p-5 rounded-3xl overflow-x-hidden overflow-y-scroll">
                <Outlet />
            </main>
        </div>
    );
};

export default Home;


