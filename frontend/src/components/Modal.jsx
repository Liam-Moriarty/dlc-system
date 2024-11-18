import React, { memo } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Form from "./Form";
import Button from "./Button";
import ProductsForm from "./ProductsForm";
import TransactionForm from "./TransactionForm";

const Modal = memo(
  ({
    open,
    handleOpen,
    label,
    description,
    items,
    deleteModal,
    handleDelete,
    formType,
  }) => {
    return (
      <>
        <Dialog
          size="sm"
          className="dark:bg-primary-bg-dark bg-primary-bg"
          open={open}
          handler={handleOpen}
        >
          <DialogHeader className="flex flex-col gap-3 ">
            <h1 className="w-full text-center text-2xl dark:text-secondary-txt-dark text-secondary-txt">
              {label}
            </h1>
            <p className="w-full text-center text-sm">{description}</p>
          </DialogHeader>

          <DialogBody className="sm:p-0">
            {!deleteModal ? (
              <>
                {formType === "clients" && (
                  <Form handleOpen={handleOpen} items={items} />
                )}
                {formType === "products" && (
                  <ProductsForm handleOpen={handleOpen} items={items} />
                )}
                {formType === "transactions" && (
                  <TransactionForm handleOpen={handleOpen} items={items} />
                )}
              </>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <Button
                  onClick={handleOpen}
                  variant="default"
                  children="Cancel"
                />
                <Button
                  onClick={() => handleDelete(items._id)}
                  variant="delete"
                  children="Delete"
                />
              </div>
            )}
          </DialogBody>
        </Dialog>
      </>
    );
  }
);

export default Modal;
