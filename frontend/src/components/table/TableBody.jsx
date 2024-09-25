import { Typography } from "@material-tailwind/react";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";

const TableBody = ({ clientsBody, error, isLoading, sortedData }) => {
  const tabletView = useMediaQuery({ maxWidth: 992 });

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
                      <Typography
                        variant="small"
                        className={`font-normal text-primary-txt dark:text-primary-txt-dark ${
                          column === "companyName" || column === "city"
                            ? "capitalize"
                            : ""
                        } ${column === "email" ? "lowercase" : ""}`}
                      >
                        {column === "created_at" || column === "updated_at"
                          ? dayjs(items[column]).format("YYYY-MM-DD")
                          : items[column]}
                      </Typography>
                    </td>
                  )
              )}

              <td className="p-4 lg:p-2 border-b dark:border-primary-borders-dark">
                <Typography
                  variant="small"
                  className="font-medium text-primary-txt dark:text-primary-txt-dark"
                >
                  edit
                </Typography>
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
