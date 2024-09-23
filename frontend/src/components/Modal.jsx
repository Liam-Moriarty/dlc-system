import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Button from "./Button";
import Form from "./Form";

const Modal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="default"
        children="Add Clients"
        icon={
          <IoMdInformationCircleOutline strokeWidth={2} className="h-4 w-4" />
        }
      />

      <Dialog
        size="xs"
        className="dark:bg-primary-bg-dark bg-primary-bg"
        open={open}
        handler={handleOpen}
      >
        <DialogHeader className="flex flex-col gap-3 ">
          <h1 className="w-full text-center">Client Application</h1>
          <p className="w-full text-center text-sm dark:text-secondary-txt-dark text-secondary-txt">
            Submit the form below to add new client
          </p>
        </DialogHeader>

        <DialogBody className="sm:p-0">
          <Form handleOpen={handleOpen} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Modal;
