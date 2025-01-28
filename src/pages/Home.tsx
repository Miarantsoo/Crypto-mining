import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Bg from "./../assets/img/bg.jpg"
import {useEffect} from "react";
import axiosInstance from "../api/AxiosConfig";
// import {setUser} from "../context/UserContext.tsx"


const Home: React.FC = () => {
    useEffect( () => {
        // localStorage.key("token");
        const response =  axiosInstance.post('/utilisateur/get-utilisateur', {
            headers: {
                'Content-Type': 'application/json',
            }
            // data:{
            //     mes
            // }
        });
        // @ts-ignore
        // const user=;
        // @ts-ignore

        console.log(response);
        // @ts-ignore
        // setUser();

    })
import axiosInstance from "../api/AxiosConfig";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const[ connectedUser, setConnectedUser ] = useState<Object | null>(null);

    useEffect(() => {
        console.log("qfe");

        const getUser = async () => {
            const result = await axiosInstance.post('/utilisateur/get-utilisateur', {
                headers: {
                    'Content-type': 'application/json'
                }
            });
            setConnectedUser(result);
        } 

        getUser();
        
        console.log(connectedUser);
        
    }, [connectedUser]);
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


