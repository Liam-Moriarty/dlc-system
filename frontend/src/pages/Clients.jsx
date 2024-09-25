// REACT PACKAGES
import { useState } from "react";
import { Card } from "@material-tailwind/react";

// COMPONENTS IMPORTS
import TableHeader from "../components/TableHeader";
import Table from "../components/table/Table";
import Pagination from "../components/Pagination";
import { useMediaQuery } from "react-responsive";

const Clients = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });
  const [page, setPage] = useState(1);
  const limit = 10;

  return (
    <>
      {!tabletView ? (
        <Card className="w-full h-[47rem] md:h-full flex justify-between overflow-hidden bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark">
          <TableHeader
            title="Clients"
            description="Manage Clients"
            btn1="View All"
          />
          <Table page={page} limit={limit} />
          <Pagination setPage={setPage} page={page} />
        </Card>
      ) : (
        <p>Mobile View Here</p>
      )}
    </>
  );
};

export default Clients;
