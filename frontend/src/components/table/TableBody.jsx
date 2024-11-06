import { useState } from "react";

// PACKAGES
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import Dropdown from "../Dropdown";

const TableBody = ({
  tableBody,
  error,
  isLoading,
  sortedData,
  deleteApi,
  label,
  modalDesc,
  formtype,
}) => {
  const tabletView = useMediaQuery({ maxWidth: 992 });
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <tbody>
      {isLoading ? (
        <tr>
          <td
            colSpan={tableBody.length + 1}
            className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
          >
            Loading...
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td
            colSpan={tableBody.length + 1}
            className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
          >
            Error getting the data, try again later...
          </td>
        </tr>
      ) : Array.isArray(sortedData) && sortedData.length > 0 ? (
        sortedData.map((items) => {
          return (
            <tr key={items._id}>
              {tableBody.map(
                (column) =>
                  (!tabletView ||
                    (column !== "createdAt" && column !== "updatedAt")) && (
                    <td
                      key={column}
                      className="p-4 lg:p-2 border-b dark:border-primary-borders-dark"
                    >
                      {column === "image" ? (
                        <img
                          src={items.image.replace(/\.(jpg|png|webp)/, ".jpg")}
                          alt="product image"
                          loading="lazy"
                          className="h-10 w-10 rounded-full object-cover border dark:bg-secondary-bg-dark bg-secondary-bg dark:border-primary-borders-dark border-primary-borders"
                        />
                      ) : null}
                      <p
                        className={`text-sm  ${
                          column === "email" ? "lowercase" : "capitalize"
                        } ${column === "image" ? "hidden" : null} `}
                      >
                        {column === "createdAt" || column === "updatedAt" ? (
                          dayjs(items[column]).format("MMM D, YYYY")
                        ) : column === "price" ? (
                          <span>₱{items[column].toLocaleString()}</span>
                        ) : (
                          items[column]
                        )}
                      </p>
                    </td>
                  )
              )}

              <td className="p-2 border-b dark:border-primary-borders-dark">
                <Dropdown
                  items={items}
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                  deleteApi={deleteApi}
                  label={label}
                  modalDesc={modalDesc}
                  formtype={formtype}
                />
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={tableBody.length + 1}
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
