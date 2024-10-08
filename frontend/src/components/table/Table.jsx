// COMPONENTS IMPORTS
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// CONSTANTS
import { clientsHeader } from "../../constants/clientConst";
import { clientsBody } from "../../constants/clientConst";

// API SLICE
import { useGetPaginatedClientsQuery } from "../../api/generalApi";
import useSort from "../../utils/sortingUtils";

const Table = ({ page, limit }) => {
  const { data, error, isLoading } = useGetPaginatedClientsQuery({
    page,
    limit,
  });

  // Extract the data array from the API response
  const dataArray = data ? data.client : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  return (
    <div className="w-full overflow-auto flex grow items-start">
      {data ? (
        <table className="w-full text-left">
          <TableHead tableHead={clientsHeader} requestSort={requestSort} />

          <TableBody
            clientsBody={clientsBody}
            error={error}
            isLoading={isLoading}
            sortedData={sortedData}
          />
        </table>
      ) : null}
    </div>
  );
};

export default Table;
