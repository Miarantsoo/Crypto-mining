import { MutatingDots } from "react-loader-spinner";

type LoadingProps = {
  text?: string;
};

const Loading: React.FC<LoadingProps> = ({ text = "Chargement..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <MutatingDots
        color="#1C32C4"
        secondaryColor="#D8E1FF"
        height={100}
        width={100}
        ariaLabel="loading"
      />
      <p className="text-lg text-dark font-body animate-pulse">{text}</p>
    </div>
  );
};

export default Loading;
