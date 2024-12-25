import React from "react";
import { useMediaQuery } from "react-responsive";
import { Card } from "@material-tailwind/react";

import TableHeader from "../components/TableHeader";
import TransactionTable from "../components/TransactionTable";

const Transactions = () => {
  const tabletView = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="overflow-auto w-full flex-1">
      {!tabletView ? (
        <Card className="w-full h-[50rem] md:h-full flex justify-between overflow-hidden bg-primary-bg dark:bg-primary-bg-dark shadow-3xl dark:shadow-3xl-dark">
          <TableHeader
            title="Transactions"
            description="Manage Transactions"
            btnChild="Add Transactions"
            label="Create New Transaction"
            modalDesc="Submit the form below to add new transactions"
            formtype="transactions"
          />

          <TransactionTable />
        </Card>
      ) : (
        <p>Mobile View Here</p>
      )}
    </div>
  );
};

export default Transactions;
