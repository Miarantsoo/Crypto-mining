import React, {useState, useEffect} from "react";
import Bg from "../../assets/img/bg.jpg";
import AnalyseFilters from "./AnalyseFilters";

interface IResult {
    nom : string,
    valeur: number
}

const AnalyseCrypto: React.FC = () => {
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [checkAll, setCheckAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));
    const [cryptoData, setCryptoData] = useState<any[]>([]);

    const [resultats, setResultats] = useState<IResult[]>([]);
    const [type, setType] = useState<string>("1")

    const [first, setFirst] = useState<boolean>(false)

    const [min, setMin] = useState<string>(getCurrentDateTime);
    const [max, setMax] = useState<string>(getCurrentDateTime);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch("http://localhost:8089/api/analyse/crypto/list");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Crypto: ", data);
                setCryptoData(data);

                const initialCheckedItems = Array(data.length).fill(false);
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        initialCheckedItems[i] = true;
                    }
                }

                setCheckedItems(initialCheckedItems);
                console.log("Kindy e:", checkedItems);
                if (initialCheckedItems.every(item => item)) {
                    setCheckAll(true);
                }

                setFirst(true)
            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        fetchCryptoData();
        }, []);

        useEffect(() => {
            handleSubmit();
        },[first]);

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
        const data = await response.json();
        console.log("Crypto: ", data);
        setCryptoData(data);

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value)
    }

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMin(event.target.value)
    }

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMax(event.target.value)
    }

    const handleSubmit = async () => {

        const selectedCryptoIds = checkedItems
            .map((isChecked, index) => isChecked ? cryptoData[index]?.id : null)
            .filter(id => id !== null);

        const formData = {
            typeAnalyse: type,
            minDate: min,
            maxDate: max,
            cryptoIds: selectedCryptoIds,
        };

        console.log("formData: ", formData);

        try {
            const response = await fetch("http://localhost:8089/api/analyse/crypto/resultat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            setResultats(result);
            console.log("Analysis result:", result);

        } catch (error) {
            console.error("Error submitting form:", error);
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
                <form>
                    <div className="w-fit flex flex-row gap-5">
                        <div>
                            <label htmlFor="type" className="font-body text-dark mb-2 text-base">
                                Type d'analyse
                            </label>
                            <div className="flex flex-row">
                                <select
                                    name="type"
                                    id="type"
                                    onChange={handleTypeChange}
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
                                    value={min}
                                    onChange={handleMinChange}
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
                                    value={max}
                                    onChange={handleMaxChange}
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
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-main text-light hover:bg-main-700 rounded-lg ml-0 font-body mt-5"
                        >
                            Valider
                        </button>
                    </div>
                </form>
                {resultats && resultats.length > 0 && (
                    <div className="mt-8 border rounded-lg overflow-hidden shadow-md">
                        <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
                            <thead className="border-b bg-lavender-50 border-b-lavender">
                            <tr>
                                <th className="p-4 text-lg text-main font-extrabold">Crypto</th>
                                <th className="p-4 text-lg text-main font-extrabold">Valeur</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultats.map((resultat, index) => (
                                <tr key={index} className="border-b border-b-lavender">
                                    <td className="p-4">{resultat.nom}</td>
                                    <td className="p-4">{resultat.valeur}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyseCrypto;
