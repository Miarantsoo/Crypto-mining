import React, { useState, useEffect } from "react";
import AnalyseFilters from "./AnalyseFilters";
import GenericTable from "../generic/GenericTable";
import GenericBarChart from "../generic/GenericBarChart";
import { IResult } from "../../types/form";
import ToggleTabs from "../generic/ToggleTabs";

const AnalyseCrypto: React.FC = () => {
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

  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(10).fill(false)
  );
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  const [resultats, setResultats] = useState<IResult[]>([]);
  const [type, setType] = useState<string>("1");

  const [first, setFirst] = useState<boolean>(false);

  const [min, setMin] = useState<string>(getCurrentDateTime);
  const [max, setMax] = useState<string>(getCurrentDateTime);
  const [view, setView] = useState<string>("table");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8089/api/analyse/crypto/list"
        );
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

        setTimeout(() => {
          setFirst(true);
        }, 1000);

      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);
  
  useEffect(() => {
    if (first) {
      handleSubmit();
    }
  },[first]);

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

    console.log("formData: ", formData);

    try {
      const response = await fetch(
        "http://localhost:8089/api/analyse/crypto/resultat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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
      console.log("Analysis result:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="px-5 py-5">
      <div className="mb-5 flex flex-row justify-between w-full">
        <h1 className="font-title font-bold uppercase text-dark text-4xl">
          Analyse Crypto
        </h1>
        <ToggleTabs options={viewOptions} onSelect={setView}></ToggleTabs>
      </div>

      <AnalyseFilters
        url={"/analyse/crypto/resultat"}
        setData={setResultats}
        cryptoData={cryptoData}
        minValue={min}
        maxValue={max} typesAnalyse={[
          {value: "1", display: "1er Quartile"},
          {value: "2", display: "Max"},
          {value: "3", display: "Min"},
          {value: "4", display: "Moyenne"},
          {value: "5", display: "Ecart-type"},
        ]}      />

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
        ) : "")}
    </div>
  );
}
export default AnalyseCrypto;
