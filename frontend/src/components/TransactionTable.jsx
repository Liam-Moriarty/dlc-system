// PACKAGES
import React, { useState } from "react";

// COMPONENTS
import Table from "./table/Table";
import Pagination from "./Pagination";
import useSort from "../utils/sortingUtils";
import { transactionBody, transactionHeader } from "../constants/transaction";

// API QUERY
import {
  useDeleteTransactionMutation,
  useGetPaginatedTransactionQuery,
} from "../api/generalApi/transactionApi";

const TransactionTable = () => {
  const [page, setPage] = useState(1);
  const limit = 50;

  const { data, error, isLoading } = useGetPaginatedTransactionQuery({
    page,
    limit,
  });

  const [deleteTransaction] = useDeleteTransactionMutation();

  const dataArray = data ? data.transaction : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  const totalPages = data ? data.totalPages : [];
  const currentPage = data ? data.currentPage : [];

  return (
    <>
      <Table
        data={sortedData}
        error={error}
        isLoading={isLoading}
        requestSort={requestSort}
        tableHead={transactionHeader}
        tableBody={transactionBody}
        deleteApi={deleteTransaction}
        label="Update Existing Transaction"
        modalDesc="Submit the form below to update transaction"
        formtype="transactions"
      />
      <Pagination
        setPage={setPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default TransactionTable;
