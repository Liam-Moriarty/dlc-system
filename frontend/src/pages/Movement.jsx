// REACT PACKAGES
import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import useSort from "../utils/sortingUtils";
import { movementBody, movementHeader } from "../constants/movementConst";

// API SLICE
import {
  useDeleteMovementMutation,
  useGetPaginatedMovementQuery,
} from "../api/inventoryApi/movementApi";

const Movement = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, error, isLoading } = useGetPaginatedMovementQuery({
    page,
    limit,
  });
  const [deleteMovement] = useDeleteMovementMutation();

  // Extract the data array from the API response and sort it
  const dataArray = data ? data.movement : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  // Extract the pagination total and current pages
  const totalPages = data ? data.totalPages : [];
  const currentPage = data ? data.currentPage : [];

  return (
    <div className="overflow-auto w-full flex-1">
      {!tabletView ? (
        <Card className="w-full h-[50rem] flex-1 md:h-full flex justify-between bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark overflow-auto">
          <TableHeader
            title="Inventory Shipment"
            description="Manage Shipments"
            btnChild="Add Shipments"
            label="Shipments Application"
            modalDesc="Submit the form below to add new shipments"
            formtype="movement"
          />
          <Table
            data={sortedData}
            error={error}
            isLoading={isLoading}
            requestSort={requestSort}
            tableHead={movementHeader}
            tableBody={movementBody}
            deleteApi={deleteMovement}
            label="Update Existing Shipnments"
            modalDesc="Submit the form below to update Shipments"
            formtype="movement"
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
    </div>
  );
};

export default Movement;
