import { useState } from "react";
import api from "../../api/JavaAxiosConfig";

type FilterProps = {
  url: string;
  setData: (data) => void;
  cryptoData: Crypto[];
};

const AnalyseFilters: React.FC<FilterProps> = ({
  url,
  setData,
  cryptoData,
}) => {
  const [checkAll, setCheckAll] = useState(true);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(10).fill(true)
  );

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
        const response = await api.post(url, formData);
  
        setData(response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-fit flex flex-row gap-5">
        <div>
          <label htmlFor="type" className="font-body text-dark mb-2 text-base">
            Type d'analyse
          </label>
          <div className="flex flex-row">
            <select
              name="type"
              id="type"
              className="h-11 p-2 border border-lavender bg-light rounded-lg font-body focus:ring-main focus:border-none"
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
