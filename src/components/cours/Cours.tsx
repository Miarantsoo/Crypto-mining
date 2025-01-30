import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart } from "@mui/x-charts";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import api from "../../api/JavaAxiosConfig";

type Crypto = {
  id: number;
  nom: string;
  daty: string;
};

type HistoCrypto = {
  id: number;
  idCrypto: Crypto;
  daty: string;
  valeur: number;
};

const Cours = () => {
  const [allCryptos, setAllCryptos] = useState<Crypto[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [histoCrypto, setHistoCrypto] = useState<HistoCrypto[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await api.get("/crypto/");
        setAllCryptos(response.data);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    if (allCryptos.length > 0) {
      getLatestValues(allCryptos[0].id);
    }
  }, [allCryptos]);

  // Improved resize observer with proper cleanup
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: Math.min(entry.contentRect.height, 400), // Limit max height
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sort data by date and memoize
  const chartData = histoCrypto
    .map((histo) => ({
      x: new Date(histo.daty),
      y: histo.valeur,
    }))
    .sort((a, b) => a.x.getTime() - b.x.getTime());

  const getLatestValues = async (id: number) => {
    try {
      const response = await api.get(`/histoCrypto/current-value/${id}`);
      setHistoCrypto(response.data);
    } catch (error) {
      console.error("Error fetching crypto values:", error);
    }
  };

  const handleCryptoClick = async (index: number) => {
    setSelectedIndex(index);
    await getLatestValues(allCryptos[index].id);
  };

  return (
    <div className="relative w-full mx-auto flex flex-col justify-center px-5 py-5">
      <div className="mb-5">
        <h1 className="font-title font-bold text-3xl text-dark uppercase">
          Cours des cryptomonnaies
        </h1>
        <p className="font-body text-slate-500 text-base">
          Cette page vous montre le cours actuel des cryptomonnaies.
        </p>
      </div>

      <div className="w-full flex flex-row gap-5">
        <div className="flex flex-col justify-center w-2/3">
          <div ref={containerRef} className="w-full h-[400px]">
            <LineChart
              key={selectedIndex} // Force re-render on crypto change
              width={dimensions.width}
              height={dimensions.height}
              series={[
                {
                  data: chartData.map((d) => d.y),
                  curve: "linear",
                  showMark: ({ index }) => index === chartData.length - 1,
                },
              ]}
              xAxis={[
                {
                  data: chartData.map((d) => d.x),
                  scaleType: "time",
                  valueFormatter: (date: Date) =>
                    date.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "UTC", // Add this line to use UTC timezone
                    }),
                },
              ]}
              colors={["#1C32C4"]}
              margin={{ left: 70, right: 30, top: 50, bottom: 50 }}
              grid={{ vertical: false, horizontal: true }}
              sx={{
                "& .MuiChartsTooltip-root": {
                  fontFamily: "Space Grotesk",
                },
              }}
            />
          </div>

          <div className=" mt-5 flex items-center justify-center self-center">
            <AnimatePresence>
              {allCryptos.length > 0 &&
                allCryptos.map((crypto, index) => {
                  const position = index - selectedIndex;

                  return (
                    <motion.div
                      key={crypto.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{
                        opacity:
                          Math.abs(position) === 1
                            ? 0.5
                            : position === 0
                            ? 1
                            : 0,
                        x: position * 100, // Moves cryptos left/right
                        scale: position === 0 ? 1.2 : 1,
                      }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className={`absolute text-base font-bold cursor-pointer font-title uppercase ${
                        position === 0 ? "text-main" : "text-slate-500"
                      }`}
                      onClick={() => handleCryptoClick(index)}
                    >
                      {crypto.nom}
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-1/3 bg-gradient-to-br from-secondary to-main rounded-lg px-5 py-5 my-8 flex flex-col gap-5 shadow-md justify-around text-light">
          <div className="flex flex-row gap-5 items-center border-b border-b-lavender py-5">
            <FaArrowRightArrowLeft className="text-4xl" />
            <h3 className="font-title uppercase text-4xl font-extrabold">
              {allCryptos[selectedIndex] !== undefined
                ? allCryptos[selectedIndex].nom
                : ""}
            </h3>
          </div>
          <div>
            <p className="font-body text-base font-regular">
              Valeur unitaire
            </p>
            <p className="font-body text-4xl font-bold">
              {histoCrypto[0] !== undefined ? histoCrypto[0].valeur + " " : " "}€
            </p>
          </div>

          <form className="flex flex-row gap-2">
            <input
              type="number"
              placeholder="Quantité"
              className="text-dark bg-light focus:ring-0 font-body rounded-lg"
            />
              <button className="rounded-lg w-1/2 bg-secondary hover:bg-secondary-600 text-light px-5 py-3 font-body flex flex-row gap-2 items-center">
                Acheter
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cours;