import React, { useState } from "react";
import { CardHeader } from "@material-tailwind/react";
import Button from "./Button";
import Modal from "./Modal";
import { IoMdInformationCircleOutline } from "react-icons/io";

const TableHeader = ({
  title,
  description,
  formtype,
  label,
  modalDesc,
  btnChild,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="overflow-visible rounded-none bg-primary-bg dark:bg-primary-bg-dark m-0 p-4"
    >
      <div className="flex items-center justify-between lg:gap-4">
        <div className="w-full">
          <h1 className="text-primary-txt dark:text-primary-txt-dark font-semibold sm:text-base">
            {title}
          </h1>
          <p className="sm:text-sm text-primary-txt dark:text-primary-txt-dark">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 flex-row mb-2 sm:flex sm:flex-col-reverse">
          <Button children="Download CSV" variant="outline" />
          <Button
            onClick={handleOpen}
            variant="default"
            children={btnChild}
            icon={
              <IoMdInformationCircleOutline
                strokeWidth={2}
                className="h-4 w-4"
              />
            }
          />
          <Modal
            open={open}
            handleOpen={handleOpen}
            label={label}
            description={modalDesc}
            formType={formtype}
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default TableHeader;
