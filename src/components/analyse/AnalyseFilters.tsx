import { useState } from "react";
import api from "../../api/JavaAxiosConfig";
import { TypeAnalyse } from "../../types/form";

type FilterProps = {
  url: string;
  setData: (data) => void;
  cryptoData: Crypto[];
  minValue: string;
  maxValue: string;
  typesAnalyse: TypeAnalyse[];
};

const AnalyseFilters: React.FC<FilterProps> = ({
  url,
  setData,
  cryptoData,
  minValue,
  maxValue,
  typesAnalyse,
}) => {
  const [checkAll, setCheckAll] = useState(true);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(10).fill(true)
  );
  const [type, setType] = useState<string>("1");
  const [min, setMin] = useState<string>(minValue);
  const [max, setMax] = useState<string>(maxValue);

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

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setType(event.target.value);
    };
  
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMin(event.target.value);
    };
  
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMax(event.target.value);
    };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const selectedCryptoIds = checkedItems
      .map((isChecked, index) => (isChecked ? cryptoData[index]?.id : null))
      .filter((id) => id !== null); // Filter out null values (unchecked items)
    console.log(selectedCryptoIds);

    const formData = {
      typeAnalyse: event.currentTarget.type.value,
      minDate: event.currentTarget.min.value,
      maxDate: event.currentTarget.max.value,
      cryptoIds: selectedCryptoIds,
    };

    console.log("formData: ", formData);

    try {
      const response = await api.post(url, formData);

      setData(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="w-fit flex flex-row gap-5">
        <div>
          <label htmlFor="type" className="font-body text-dark mb-2 text-base">
            Type d'analyse
          </label>
          <div className="flex flex-row">
            <select
              onChange={handleTypeChange}
              name="type"
              id="type"
              className="h-11 p-2 border border-lavender bg-light rounded-lg font-body focus:ring-main focus:border-none"
            >
              {typesAnalyse.map((type) => (
                <option value={type.value}>{type.display}</option>
              ))}
              {/* <option value="1">1er Quartile</option>
              <option value="2">Max</option>
              <option value="3">Min</option>
              <option value="4">Moyenne</option>
              <option value="5">Ecart-type</option> */}
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
              onChange={handleMinChange}
              name="min"
              value={min}
              className="h-11 p-2 border border-lavender bg-light rounded-lg font-body focus:ring-main focus:border-none"
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
              className="h-11 p-2 border border-lavender bg-light rounded-lg font-body focus:ring-main focus:border-none"
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
    </form>
  );
};

export default AnalyseFilters;
