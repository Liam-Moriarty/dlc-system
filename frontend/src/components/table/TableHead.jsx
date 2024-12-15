import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { LuChevronsUp, LuChevronsDown, LuChevronsUpDown } from "react-icons/lu";

const TableHead = ({ tableHead, requestSort }) => {
  const [sortState, setSortState] = useState({
    accesor: null,
    direction: null,
  });

  const handleSort = (accesor) => {
    const newDirection =
      sortState.accesor === accesor
        ? sortState.direction === "asc"
          ? "desc"
          : "asc"
        : "asc";

    setSortState({ accesor, direction: newDirection });
    requestSort(accesor, newDirection); // Pass the direction to requestSort
  };

  return (
    <thead className="sticky top-0 z-10">
      <tr>
        {tableHead.map(({ title, sortable, accesor }) => {
          const isActive = sortState.accesor === accesor;
          const icon = isActive ? (
            sortState.direction === "desc" ? (
              <LuChevronsUp />
            ) : (
              <LuChevronsDown />
            )
          ) : (
            <LuChevronsUpDown />
          );

          const hiddenColumns =
            accesor.toLowerCase() === "created" ||
            accesor.toLowerCase() === "updated" ||
            accesor == "saleDate" ||
            accesor == "companyCity"
              ? "lg:hidden lg:table-cell"
              : "";

          return (
            <th
              key={title}
              className={`border-b border-blue-gray-100 dark:border-primary-borders-dark p-4 lg:p-1 bg-secondary-bg dark:bg-secondary-bg-dark ${hiddenColumns}`}
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-light leading-none opacity-80 flex"
              >
                {title}
                {sortable && (
                  <span
                    className="cursor-pointer h-4 w-4 ml-4"
                    onClick={() => handleSort(accesor)}
                  >
                    {icon}
                  </span>
                )}
              </Typography>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
