// REACT PACKAGES
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Card } from "@material-tailwind/react";

// COMPONENTS IMPORTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import useSort from "../utils/sortingUtils";
import { productsHeader, productsBody } from "../constants/productConst";

// API IMPORTS
import {
  useDeleteProductsMutation,
  useGetPaginatedProductQuery,
} from "../api/generalApi/productsApi";

const Products = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, error, isLoading } = useGetPaginatedProductQuery({
    page,
    limit,
  });
  const [deleteProducts] = useDeleteProductsMutation();

  const dataArray = data ? data.product : [];
  const { data: sortedData, requestSort } = useSort(dataArray);

  const totalPages = data ? data.totalPages : [];
  const currentPage = data ? data.currentPage : [];

  return (
    <>
      {!tabletView ? (
        <Card className="w-full h-[45rem] md:h-full flex justify-between overflow-hidden bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark">
          <TableHeader
            title="Products"
            description="Manage Products"
            btnChild="Add Products"
            label="Create New Products"
            modalDesc="Submit the form below to add new products"
            formtype="products"
          />
          <Table
            data={sortedData}
            error={error}
            isLoading={isLoading}
            requestSort={requestSort}
            tableHead={productsHeader}
            tableBody={productsBody}
            deleteApi={deleteProducts}
            label="Update Existing Product"
            modalDesc="Submit the form below to update Product"
            formtype="products"
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

export default Products;
