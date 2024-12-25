import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

const Pagination = memo(({ setPage, totalPages, currentPage }) => {
  // Function to handle page change
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="flex items-center justify-end gap-8 py-5 px-8 ">
      <IconButton
        size="sm"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="dark:border-primary-borders-dark border-primary-borders border-2 bg-transparent"
      >
        <ArrowLeftIcon
          strokeWidth={2}
          className="h-4 w-4 dark:text-primary-txt-dark text-primary-txt"
        />
      </IconButton>

      <h3 color="gray" className="font-normal cursor-pointer lg:text-sm">
        Page{" "}
        <strong className="dark:text-primary-txt-dark text-primary-txt">
          {currentPage}
        </strong>{" "}
        of{" "}
        <strong className="dark:text-primary-txt-dark text-primary-txt">
          {totalPages}
        </strong>
      </h3>

      <IconButton
        size="sm"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="dark:border-primary-borders-dark border-primary-borders border-2 bg-transparent"
      >
        <ArrowRightIcon
          strokeWidth={2}
          className="h-4 w-4 dark:text-primary-txt-dark text-primary-txt"
        />
      </IconButton>
    </div>
  );
});

export default Pagination;
