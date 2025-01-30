import React, { useState, useEffect } from "react";
import Bg from "../../assets/img/bg.jpg";
import AnalyseFilters from "./AnalyseFilters";

const AnalyseCrypto: React.FC = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(10).fill(false)
  );
  const [cryptoData, setCryptoData] = useState<any[]>([]); // Store the fetched crypto data
  const [histoCrypto, setHistoCrypto] = useState<object[]>([]);

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
        console.log("Crypto: ", data);
        setCryptoData(data);

        const initialCheckedItems = Array(data.length).fill(false);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            initialCheckedItems[i] = false;
          }
        }

        setCheckedItems(initialCheckedItems);
        if (initialCheckedItems.every((item) => item)) {
          setCheckAll(true);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleCheckAll = () => {
    const newCheckAll = !checkAll;
    setCheckAll(newCheckAll);
    setCheckedItems(Array(10).fill(newCheckAll));
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    if (newCheckedItems.every((item) => item)) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const selectedCryptoIds = checkedItems
      .map((isChecked, index) => (isChecked ? cryptoData[index]?.id : null))
      .filter((id) => id !== null); // Filter out null values (unchecked items)

    const formData = {
      typeAnalyse: event.currentTarget.type.value,
      minDate: event.currentTarget.min.value,
      maxDate: event.currentTarget.max.value,
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
        const errorData = await response.json(); // Try to get error details from the server
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || response.statusText
          }`
        );
      }

      const result = await response.json();
      console.log("Analysis result:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="w-full min-h-dvh bg-cover flex flex-row p-6"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="bg-light rounded-lg w-full px-8 py-8">
        <div className="mb-5">
          <h1 className="font-title font-bold uppercase text-dark text-4xl">
            Analyse Crypto
          </h1>
        </div>
        <AnalyseFilters
          url={"/histoCrypto/current-value/2"}
          setData={(data) => { console.log(data) }}
          cryptoData={cryptoData ? cryptoData : []}
        ></AnalyseFilters>
        {/* <form onSubmit={handleSubmit}>
                    <div className="w-fit flex flex-row gap-5">
                        <div>
                            <label htmlFor="type" className="font-body text-dark mb-2 text-base">
                                Type d'analyse
                            </label>
                            <div className="flex flex-row">
                                <select
                                    name="type"
                                    id="type"
                                    className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                                >
                                    <option value="1">1er Quartile</option>
                                    <option value="2">Max</option>
                                    <option value="3">Min</option>
                                    <option value="4">Moyenne</option>
                                    <option value="5">Ecart-type</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="min" className="font-body text-dark mb-2 text-base">
                                Min
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="datetime-local"
                                    id="min"
                                    name="min"
                                    className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                                    // required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="max" className="font-body text-dark mb-2 text-base">
                                Max
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="datetime-local"
                                    id="max"
                                    name="max"
                                    className="h-11 p-2 border border-lavender rounded-lg font-body focus:ring-main focus:border-none"
                                    // required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="check-all"
                                checked={checkAll}
                                onChange={handleCheckAll}
                                className="h-4 w-4 text-main selected:ring-none rounded-md"
                            />
                            <label htmlFor="check-all" className="ml-2 font-body text-dark">
                                Tous
                            </label>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-5 gap-4">
                            {[...Array(cryptoData.length)].map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={index}
                                        checked={checkedItems[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                        className="h-4 w-4 text-main selected:ring-none rounded-md"
                                    />
                                    <label htmlFor={index} className="ml-2 font-body text-dark">
                                        {cryptoData[index].nom}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-main text-light hover:bg-main-700 rounded-lg ml-0 font-body mt-5"
                        >
                            Valider
                        </button>
                    </div>
                </form> */}
      </div>
    </div>
  );
};

export default AnalyseCrypto;
