import { useNavigate } from "react-router";

const Profil: React.FC = () => {
    
    const navigation = useNavigate();
  
    return (
    <div>
        VOICI MON PROFIL
        <button
            onClick={() => navigation(-1)}
        >
            Retour
        </button>
    </div>
  );
};

export default Profil;