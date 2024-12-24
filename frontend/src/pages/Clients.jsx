// REACT PACKAGES
import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";

// COMPONENTS / CUSTOM HOOK IMPORTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import useSort from "../utils/sortingUtils";
import { clientsBody, clientsHeader } from "../constants/clientConst";

// API SLICE
import {
  useDeleteClientMutation,
  useGetPaginatedClientsQuery,
} from "../api/generalApi/clientApi";

// CONSTANTS

const Clients = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, error, isLoading } = useGetPaginatedClientsQuery({
    page,
    limit,
  });
  const [deleteClient] = useDeleteClientMutation();

  // Extract the data array from the API response and sort it
  const dataArray = data ? data.client : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  // Extract the pagination total and current pages
  const totalPages = data ? data.totalPages : [];
  const currentPage = data ? data.currentPage : [];

  return (
    <>
      {!tabletView ? (
        <Card className="w-full h-[45rem] md:h-full flex justify-between overflow-hidden bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark">
          <TableHeader
            title="Clients"
            description="Manage Clients"
            btnChild="Add Client"
            label="Client Application"
            modalDesc="Submit the form below to add new client"
            formtype="clients"
          />
          <Table
            data={sortedData}
            error={error}
            isLoading={isLoading}
            requestSort={requestSort}
            tableHead={clientsHeader}
            tableBody={clientsBody}
            deleteApi={deleteClient}
            label="Update Existing Client"
            modalDesc="Submit the form below to update Client"
            formtype="clients"
          />
          <Pagination
            setPage={setPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Card>
      ) : (
        <p>Mobile View Here</p>
      )}
    </>
  );
};

export default Clients;
