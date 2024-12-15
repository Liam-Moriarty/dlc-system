// PACKAGE IMPORTS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import Button from "./Button";
import TransactionDropdown from "./TransactionDropdown";

// API ACTIONS
import {
  cleanTransactionData,
  transactionData,
} from "../features/formState/transactionSlice";

// QUERY
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
    clientId: transactionState.clientId || "",
    productId: transactionState.productId || "",
    price: transactionState.price || "",
    total: transactionState.total || "",
    paymentMethod: transactionState.paymentMethod || "",
    priceAtSale: transactionState.priceAtSale || "",
    statusOrder: transactionState.statusOrder || "",
    quantity: transactionState.quantity || "",
  });

  useEffect(() => {
    if (items) {
      const updatedTransactionForm = {
        clientId: items.clientId || "",
        productId: items.productId || "",
        price: items.price || "",
        total: items.total || "",
        paymentMethod: items.paymentMethod || "",
        priceAtSale: items.priceAtSale || "",
        statusOrder: items.statusOrder || "",
        quantity: items.quantity || "",
      };
      setTransactionForm(updatedTransactionForm);
    }
  }, [items]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    const {
      clientId,
      productId,
      price,
      total,
      paymentMethod,
      priceAtSale,
      statusOrder,
      quantity,
    } = transactionForm;

    console.log("Form Data:", transactionForm);

    if (
      !clientId ||
      !productId ||
      !price ||
      !total ||
      !paymentMethod ||
      !priceAtSale ||
      !statusOrder ||
      !quantity
    ) {
      console.log("Missing Field Detected");
      return setError("All fields are required");
    }

    try {
      const payload = {
        clientId,
        productId,
        price,
        total,
        paymentMethod,
        priceAtSale,
        statusOrder,
        quantity,
      };

      if (items) {
        await updateTransaction({
          id: items._id,
          ...payload,
        });
      } else {
        await createTransaction(payload);
      }

      console.log(payload);

      setTransactionForm({
        clientId: "",
        productId: "",
        price: "",
        total: "",
        paymentMethod: "",
        priceAtSale: "",
        statusOrder: "",
        quantity: "",
      });
      dispatch(cleanTransactionData());
      setError("");
    } catch (error) {
      setError("An error occurred while processing your transaction.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (error) {
      setError("");
    }

    setTransactionForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(transactionData({ [name]: value }));
  };
  return (
    <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
      <TransactionDropdown
        transactionForm={transactionForm}
        setTransactionForm={setTransactionForm}
        handleChange={handleChange}
      />

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
