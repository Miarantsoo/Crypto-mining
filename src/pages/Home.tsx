import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Bg from "./../assets/img/bg.jpg";
import { useEffect, useState } from "react";
import { UserInterface, UserProvider } from "../context/UserContext.tsx";
import axiosInstance from "../api/AxiosConfig.ts";

const Home: React.FC = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axiosInstance.get(
          "/utilisateur/get-utilisateur",
          {
            headers: { "Content-type": "application/json" },
          }
        );

        if (result.data && result.data.data) {
          // console.log("Utilisateur récupéré :", result.data.data.data);
          setUser(result.data.data.data as UserInterface);
        }
      } catch (error) {
        navigate("/")
      }
    };

    getUser();
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      {" "}
      {/* Fournit l'utilisateur à tous les enfants */}
      <div
        className="flex flex-row bg-cover min-h-screen overflow-auto"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <aside className="w-1/5 h-fit">
          <Sidebar />
        </aside>
        <main className="bg-light w-4/5 h-dvh overflow-y-scroll mr-3 my-3 p-5 rounded-3xl overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
};

export default Home;
