import { memo, useMemo, useState } from "react";

// PACKAGES
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import {
  getIndicators,
  imageColumn,
  columnTextFormat,
  pfpColumn,
  formats,
} from "./BodyFunctions";
import Dropdown from "../Dropdown";

const TableBody = memo(
  ({
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
    const isTabletView = useMemo(() => tabletView, [tabletView]);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    if (isLoading) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={tableBody.length + 1}
              className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
            >
              Loading...
            </td>
          </tr>
        </tbody>
      );
    }

    if (error) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={tableBody.length + 1}
              className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
            >
              Error getting the data, try again later...
            </td>
          </tr>
        </tbody>
      );
    }

    if (!Array.isArray(sortedData) || sortedData.length === 0) {
      return (
        <tbody>
          <tr>
            <td
              colSpan={tableBody.length + 1}
              className="p-5 text-xl text-center font-semibold text-primary-txt dark:text-primary-txt-dark"
            >
              No data available
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {sortedData.map((items) => {
          return (
            <tr key={items._id}>
              {tableBody.map((column) => {
                if (
                  !isTabletView ||
                  (column !== "createdAt" &&
                    column !== "updatedAt" &&
                    column !== "saleDate" &&
                    column !== "companyCity")
                ) {
                  return (
                    <td
                      key={`${column}-${items._id}`}
                      className="p-4 lg:p-2 border-b dark:border-primary-borders-dark"
                    >
                      {imageColumn(column, items)}
                      {pfpColumn(column, items)}

                      <p
                        className={`text-sm lg:text-xs ${getIndicators(
                          column,
                          items
                        )} ${columnTextFormat(column)} `}
                      >
                        {formats(column, items)}
                      </p>
                    </td>
                  );
                }
                return null;
              })}

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
        })}
      </tbody>
    );
  }
);

export default TableBody;
