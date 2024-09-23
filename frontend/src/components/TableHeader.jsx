import React from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { CardHeader, Typography } from "@material-tailwind/react";
import Button from "./Button";
import Modal from "./Modal";

const TableHeader = ({ title, description, btn1, btn2 }) => {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none bg-primary-bg dark:bg-primary-bg-dark mb-2"
    >
      <div className="flex items-center justify-between gap-8 lg:gap-4 md:flex-col md:items-start">
        <div className="w-full">
          <h1 className="text-primary-txt dark:text-primary-txt-dark font-semibold sm:text-base">
            {title}
          </h1>
          <p className="sm:text-sm text-primary-txt dark:text-primary-txt-dark">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 flex-row mb-2">
          <Button children={btn1} variant="outline" />
          {btn2 === undefined ? (
            <Modal />
          ) : (
            <Button
              children={btn2}
              variant="default"
              icon={<UserPlusIcon strokeWidth={2} className="h-4 w-4" />}
            />
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default TableHeader;
