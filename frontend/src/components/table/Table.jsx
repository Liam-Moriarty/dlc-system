// COMPONENTS IMPORTS
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = ({
  data,
  error,
  isLoading,
  requestSort,
  tableHead,
  tableBody,
  deleteApi,
  label,
  modalDesc,
  formtype,
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
            deleteApi={deleteApi}
            label={label}
            modalDesc={modalDesc}
            formtype={formtype}
          />
        </table>
      ) : null}
    </div>
  );
};

export default Table;
