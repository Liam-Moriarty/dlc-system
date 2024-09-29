import { useState } from "react";

// PACKAGES
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import Dropdown from "../Dropdown";

const TableBody = ({ clientsBody, error, isLoading, sortedData }) => {
  const tabletView = useMediaQuery({ maxWidth: 992 });
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={clientsBody.length + 1}
            className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
          >
            Loading...
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td
            colSpan={clientsBody.length + 1}
            className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
          >
            Error getting the data, try again later...
          </td>
        </tr>
      ) : Array.isArray(sortedData) && sortedData.length > 0 ? (
        sortedData.map((items) => {
          return (
            <tr key={items._id}>
              {clientsBody.map(
                (column) =>
                  (!tabletView ||
                    (column !== "created_at" && column !== "updated_at")) && (
                    <td
                      key={column}
                      className="p-4 lg:p-2 border-b dark:border-primary-borders-dark"
                    >
                      <p
                        className={`text-sm ${
                          column === "companyName" || column === "city"
                            ? "capitalize"
                            : ""
                        } ${column === "email" ? "lowercase" : ""}`}
                      >
                        {column === "created_at" || column === "updated_at"
                          ? dayjs(items[column]).format("MMM D, YYYY")
                          : items[column]}
                      </p>
                    </td>
                  )
              )}

              <td className="p-2 border-b dark:border-primary-borders-dark">
                <Dropdown
                  items={items}
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                />
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={clientsBody.length + 1}
            className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
          >
            No data available
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
