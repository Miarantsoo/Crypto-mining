import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { IResult } from "../../types/form";
import GenericBarChart from "../generic/GenericBarChart";
import GenericTable from "../generic/GenericTable";
import ToggleTabs from "../generic/ToggleTabs";
import AnalyseFilters from "./AnalyseFilters";
import CommissionModal from "../commissions/CommissionModal";

const AnalyseCommission = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const viewOptions = [
    { label: "Table", path: "table" },
    { label: "Chart", path: "bar-chart" },
  ];

  const [checkAll, setCheckAll] = useState(true);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(true));
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [resultats, setResultats] = useState<IResult[]>([]);
  const [type, setType] = useState<string>("avg");
  const [first, setFirst] = useState<boolean>(false);
  const [min, setMin] = useState<string>(getCurrentDateTime());
  const [max, setMax] = useState<string>(getCurrentDateTime());
  const [view, setView] = useState<string>("table");
  const [showCommissionModal, setShowCommissionModal] = useState(false);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch("http://localhost:8089/api/analyse/crypto/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCryptoData(data);

        const initialCheckedItems = Array(data.length).fill(false);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            initialCheckedItems[i] = true;
          }
        }

        setCheckedItems(initialCheckedItems);
        if (initialCheckedItems.every((item) => item)) {
          setCheckAll(true);
        }

        setFirst(true);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [first]);

  const handleSubmit = async () => {
    const selectedCryptoIds = checkedItems
      .map((isChecked, index) => (isChecked ? cryptoData[index]?.id : null))
      .filter((id) => id !== null);

    const formData = {
      typeAnalyse: type,
      minDate: min,
      maxDate: max,
      cryptoIds: selectedCryptoIds,
    };

    try {
      const response = await fetch("http://localhost:8089/api/commission/Analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || response.statusText
          }`
        );
      }

      const result = await response.json();
      setResultats(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCommissionConfigSubmit = (config: { type: string; value: string }) => {
    console.log("New commission config:", config);
    // Implement API call here
  };

  return (
    <div className="px-5 py-5">
      {showCommissionModal && (
        <CommissionModal
          onClose={() => setShowCommissionModal(false)}
          onSubmit={handleCommissionConfigSubmit}
        />
      )}

      <div className="mb-5 flex flex-row justify-between items-center w-full">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="font-title font-bold uppercase text-dark text-4xl"
        >
          Analyse Commissions
        </motion.h1>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCommissionModal(true)}
            className="flex items-center gap-2 hover:text-main-700 text-main font-body px-4 py-2 rounded-lg transition-colors"
          >
            <FaGear className="w-5 h-5" />
            Configuration
          </motion.button>
          <ToggleTabs options={viewOptions} onSelect={setView} />
        </div>
      </div>

      <AnalyseFilters
        url="/commission/Analyse"
        setData={setResultats}
        cryptoData={cryptoData}
        minValue={min}
        maxValue={max}
        typesAnalyse={[
          { value: "avg", display: "Moyenne" },
          { value: "sum", display: "Somme" },
        ]}
      />

      {resultats &&
        resultats.length > 0 &&
        (view === "table" ? (
          <GenericTable
            headers={["Crypto", "Valeur"]}
            tableContents={resultats.map((obj) => [
              { value: obj.nom, redirect: null }, 
              { value: obj.valeur, redirect: null }
            ])}
          />
        ) : view === "bar-chart" ? (
          <GenericBarChart data={resultats} />
        ) : (
          ""
        ))}
    </div>
  );
};

export default AnalyseCommission;