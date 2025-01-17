// REACT PACKAGES
import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";

// COMPONENTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import useSort from "../utils/sortingUtils";
import { suppliersHeader, suppliersBody } from "../constants/supplierConst";

// API SLICE
import {
  useDeleteSupplierMutation,
  useGetPaginatedSupplierQuery,
} from "../api/inventoryApi/supplierApi";

const Supplier = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, error, isLoading } = useGetPaginatedSupplierQuery({
    page,
    limit,
  });
  const [deleteSupplier] = useDeleteSupplierMutation();

  // Extract the data array from the API response and sort it
  const dataArray = data ? data.supplier : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  // Extract the pagination total and current pages
  const totalPages = data ? data.totalPages : [];
  const currentPage = data ? data.currentPage : [];

  console.log("Suppliers : ", sortedData);

  return (
    <div className="overflow-auto w-full flex-1">
      {!tabletView ? (
        <Card className="w-full h-[50rem] flex-1 md:h-full flex justify-between bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark overflow-auto">
          <TableHeader
            title="Supplier"
            description="Manage Suppliers"
            btnChild="Add Suppliers"
            label="Supplier Application"
            modalDesc="Submit the form below to add new supplier"
            formtype="supplier"
          />
          <Table
            data={sortedData}
            error={error}
            isLoading={isLoading}
            requestSort={requestSort}
            tableHead={suppliersHeader}
            tableBody={suppliersBody}
            deleteApi={deleteSupplier}
            label="Update Existing Supplier"
            modalDesc="Submit the form below to update Supplier"
            formtype="supplier"
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

export default Supplier;
