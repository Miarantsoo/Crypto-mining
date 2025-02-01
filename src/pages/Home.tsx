import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Bg from "./../assets/img/bg.jpg"
import {useEffect, useState} from "react";
import {UserInterface, UserProvider, useUserContext} from "../context/UserContext.tsx";
import axiosInstance from "../api/AxiosConfig.ts";


// @ts-ignore
const Home: React.FC = () => {
    const[ connectedUser, setConnectedUser ] = useState<Object | null>(null);
    const {setUser} = useUserContext();

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

        const fetchData = async () =>{
            await getUser();
            setUser(connectedUser as UserInterface);
            console.log("HomeUser")
            console.log(connectedUser);
        }

        fetchData()
        // console.log("HomeUser")
        // console.log(connectedUser);
        // // setUser(connectedUser as UserInterface)

    }, []);

    return (
        <UserProvider>
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
        </UserProvider>
    );
};

export default Home;


