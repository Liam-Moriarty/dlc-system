// COMPONENTS IMPORTS
import TableHead from "./TableHead";
import TableBody from "./TableBody";

// CONSTANTS

const Table = ({
  data,
  error,
  isLoading,
  requestSort,
  tableHead,
  tableBody,
}) => {
  return (
    <div className="w-full overflow-auto flex grow items-start">
      {data ? (
        <table className="w-full text-left">
          <TableHead tableHead={tableHead} requestSort={requestSort} />

          <TableBody
            tableBody={tableBody}
            error={error}
            isLoading={isLoading}
            sortedData={data}
          />
        </table>
      ) : null}
    </div>
  );
};

export default Table;
