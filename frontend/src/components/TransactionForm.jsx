import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import Button from "./Button";
import TransactionDropdown from "./TransactionDropdown";
import {
  cleanTransactionData,
  transactionData,
} from "../features/formState/transactionSlice";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "../api/generalApi/transactionApi";

const TransactionForm = ({ handleOpen, items }) => {
  const dispatch = useDispatch();
  const transactionState = useSelector((state) => state.transactionForm);
  const [error, setError] = useState("");

  const [createTransaction] = useCreateTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  const [transactionForm, setTransactionForm] = useState({
    productName: transactionState.productName || "",
    clientName: transactionState.clientName || "",
    unitPrice: transactionState.unitPrice || "",
    quantity: transactionState.quantity || "",
    totalPrice: transactionState.totalPrice || "",
    dateOfSale: transactionState.dateOfSale || "",
  });

  useEffect(() => {
    if (items) {
      setTransactionForm({
        productName: items.productName || "",
        clientName: items.clientName || "",
        unitPrice: items.unitPrice || "",
        quantity: items.quantity || "",
        totalPrice: items.totalPrice || "",
        dateOfSale:
          items.dateOfSale && dayjs(items.dateOfSale).isValid()
            ? dayjs(items.dateOfSale).format("YYYY-MM-DD")
            : "",
      });
    }
  }, [items]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (
      !transactionForm.productName ||
      !transactionForm.clientName ||
      !transactionForm.unitPrice ||
      !transactionForm.quantity ||
      !transactionForm.totalPrice ||
      !transactionForm.dateOfSale
    ) {
      return setError("All fields are required");
    }

    try {
      const payload = {
        productName: transactionForm.productName,
        clientName: transactionForm.clientName,
        unitPrice: transactionForm.unitPrice,
        quantity: transactionForm.quantity,
        totalPrice: transactionForm.totalPrice,
        dateOfSale: dayjs(transactionForm.dateOfSale).format("YYYY-MM-DD"),
      };

      if (items) {
        await updateTransaction({
          id: items._id,
          ...payload,
        });
      } else {
        await createTransaction(payload);
      }

      setTransactionForm({
        productName: "",
        clientName: "",
        unitPrice: "",
        quantity: "",
        totalPrice: "",
        dateOfSale: "",
      });
      dispatch(cleanTransactionData());
      setError("");
    } catch (error) {
      return setError("Error something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransactionForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(transactionData({ [name]: value }));
  };
  return (
    <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
      <TransactionDropdown transactionForm={transactionForm} />

      {/* PRICE QUANTITY TOTAL */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Price</h3>
          <input
            type="number"
            className="input"
            name="unitPrice"
            value={transactionForm.unitPrice}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Quantity</h3>
          <input
            type="number"
            className="input"
            name="quantity"
            value={transactionForm.quantity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Total Price</h3>
          <input
            type="number"
            className="input"
            name="totalPrice"
            value={transactionForm.totalPrice}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Date of Sale</h3>
          <input
            type="date"
            className="input"
            name="dateOfSale"
            value={
              transactionForm.dateOfSale
                ? dayjs(transactionForm.dateOfSale).format("YYYY-MM-DD")
                : ""
            }
            onChange={handleChange}
          />
        </div>
      </div>
      {error && (
        <p className="!text-red-500 font-semibold text-center normal-case mb-2 ">
          All fields are required!!
        </p>
      )}

      <div className="flex gap-3 flex-col">
        <Button
          variant="default"
          className="w-full"
          children="Submit"
          submit
          onClick={handleAddTransaction}
        />

        <Button
          variant="outline"
          className="w-full"
          children="Cancel"
          onClick={handleOpen}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
