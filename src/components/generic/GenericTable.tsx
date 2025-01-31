import React from "react";

type TableData = {
  headers: string[];
  tableContents: (string | number | boolean | Date)[][];
};

const GenericTable: React.FC<TableData> = ({ headers, tableContents }) => {
  const renderItem = (item: string | number | boolean | Date) => {
    if (item instanceof Date) {
      return item.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }); // e.g., "31 janvier 2025"
    } else if (typeof item === "number") {
      return item.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); // e.g., "1 234,56"
    } else if (typeof item === "boolean") {
      return <input type="checkbox" checked={item} disabled />;
    } else {
      return item; // Strings remain unchanged
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <table className="w-full text-left table-fixed min-w-max rounded-lg font-body">
        <thead className="border-b bg-lavender-50 border-b-lavender">
          <tr>
            {headers.map((header) => (
              <th className="p-4 w-1/6 text-lg text-main font-extrabold cursor-pointer">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {tableContents && tableContents.length > 0 ? (
          <tbody>
            {tableContents.map((row, index) => (
                <tr className={index < tableContents.length - 1 ? "border-b border-b-lavender" : ""}>
                    {row.map((item) => (
                        <td className="p-4">{ renderItem(item) }</td>
                    ))}
                </tr>
            ))}
          </tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};

export default GenericTable;
