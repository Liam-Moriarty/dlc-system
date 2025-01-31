import { useState } from "react";
import { Card } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";

// COMPONENTS / CUSTOM HOOK IMPORTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import useSort from "../utils/sortingUtils";
import { adminBody, adminHeader } from "../constants/othersConst";

// API SLICE
import {
  useDeleteAdminMutation,
  usePaginatedAdminsQuery,
} from "../api/generalApi/adminApi";

const Admin = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, error, isLoading } = usePaginatedAdminsQuery({
    page,
    limit,
  });

  const [deleteAdmin] = useDeleteAdminMutation();

  // Extract the data array from the API response and sort it
  const dataArray = data ? data.results.admin : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  // Extract the pagination total and current pages
  const totalPages = data ? data.results.totalPages : [];
  const currentPage = data ? data.results.currentPage : [];

  return (
    <div className="overflow-auto w-full flex-1">
      {!tabletView ? (
        <Card className="w-full h-[50rem] flex-1 md:h-full flex justify-between bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark overflow-auto">
          <TableHeader title="Admin" description="Admin Information" />
          <Table
            data={sortedData}
            error={error}
            isLoading={isLoading}
            requestSort={requestSort}
            tableHead={adminHeader}
            tableBody={adminBody}
            deleteApi={deleteAdmin}
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

export default Admin;
