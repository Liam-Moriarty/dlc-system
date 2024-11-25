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
    clientId: {
      company: transactionState.clientId?.company || "",
      city: transactionState.clientId?.city || "",
    },
    productId: transactionState.productId?.map((product) => ({
      products: {
        product: product.products?.product || "",
        price: product.products?.price || "",
      },
      quantity: product.quantity || "",
      priceAtSale: product.priceAtSale || "",
      total: product.total || "",
    })),
    totalAmount: transactionState.totalAmount || "",
    paymentMethod: transactionState.paymentMethod || "",
    statusOrder: transactionState.statusOrder || "",
    saleDate: transactionState.saleDate || "",
  });

  useEffect(() => {
    if (items) {
      const updatedTransactionForm = {
        clientId: {
          company: items.clientId?.company || "",
          city: items.clientId?.city || "",
        },
        productId: items.productId?.map((product) => ({
          products: {
            product: product.products?.product || "",
            price: product.products?.price || "",
          },
          quantity: product.quantity || "",
          priceAtSale: product.priceAtSale || "",
          total: product.total || "",
        })) || [
          {
            products: { product: "", price: "" },
            quantity: "",
            priceAtSale: "",
            total: "",
          },
        ],
        totalAmount: items.totalAmount || "",
        paymentMethod: items.paymentMethod || "",
        statusOrder: items.statusOrder || "",
        saleDate:
          items.saleDate && dayjs(items.saleDate).isValid()
            ? dayjs(items.saleDate).format("YYYY-MM-DD")
            : "",
      };
      setTransactionForm(updatedTransactionForm);
    }
  }, [items]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (
      !transactionForm.clientId ||
      !transactionForm.productId ||
      !transactionForm.totalAmount ||
      !transactionForm.paymentMethod ||
      !transactionForm.statusOrder ||
      !transactionForm.saleDate
    ) {
      return setError("All fields are required");
    }

    try {
      const payload = {
        clientId,
        productId,
        totalAmount,
        paymentMethod,
        statusOrder,
        saleDate: dayjs(saleDate).format("YYYY-MM-DD"),
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
        clientId: "",
        productId: "",
        totalAmount: "",
        paymentMethod: "",
        statusOrder: "",
        saleDate: "",
      });
      dispatch(cleanTransactionData());
      setError("");
    } catch (error) {
      setError("An error occurred while processing your transaction.");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (error) {
      setError("");
    }

    if (name.includes("productId")) {
      const productIndex = parseInt(name.split("-")[1]);

      setTransactionForm((prev) => {
        const updatedProductId = [...prev.productId];
        updatedProductId[productIndex] = {
          ...updatedProductId[productIndex],
          products: {
            ...updatedProductId[productIndex].products,
            [name.split("-")[0]]: value,
          },
        };
        return { ...prev, productId: updatedProductId };
      });

      dispatch(transactionData({ [name]: value }));
    } else {
      // For top-level fields like clientId, totalAmount, etc.
      setTransactionForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      dispatch(transactionData({ [name]: value }));
    }

    // setTransactionForm((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));

    // dispatch(transactionData({ [name]: value }));
  };
  return (
    <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3 className="dark:text-secondary-txt-dark font-bold">Company</h3>
          <input
            type="text"
            className="input"
            name="company"
            value={transactionForm.clientId?.company}
            onChange={handleChange}
          />
        </div>
        {transactionForm.productId.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="dark:text-secondary-txt-dark font-bold">
              Product {index + 1}
            </h3>
            <input
              type="text"
              className="input"
              name={`products-product-${index}`} // This will target `product` in the products object of the correct productId index
              value={item.products?.product || ""}
              onChange={(e) => handleChange(e, index)} // Pass the index to identify the correct product
            />

            <h3>Price</h3>
            <input
              type="text"
              className="input"
              name={`products-price-${index}`} // This will target `price` in the products object of the correct productId index
              value={item.products?.price || ""}
              onChange={(e) => handleChange(e, index)} // Pass the index to identify the correct product
            />

            <h3>Quantity</h3>
            <input
              type="number"
              className="input"
              name="quantity"
              value={item.quantity}
              onChange={handleChange}
            />

            <h3>Discount</h3>
            <input
              type="number"
              className="input"
              name="priceAtSale"
              value={item.priceAtSale}
              onChange={handleChange}
            />

            <h3>Amount</h3>
            <input
              type="number"
              className="input"
              name="total"
              value={item.total}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Quantity</h3>
          <input
            type="number"
            className="input"
            name="quantity"
            value={transactionForm.productId?.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Discount</h3>
          <input
            type="number"
            className="input"
            name="priceAtSale"
            value={transactionForm.productId?.priceAtSale}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Amount</h3>
          <input
            type="number"
            className="input"
            name="total"
            value={transactionForm.total}
            onChange={handleChange}
          />
        </div>
      </div> */}

      {/* PRICE paymentMethod TOTAL */}
      <div className="grid grid-cols-2 gap-2 mb-5 border-t-2 dark:border-primary-borders-dark pt-2">
        <div className="flex flex-col gap-2">
          <h3>Total</h3>
          <input
            type="number"
            className="input"
            name="totalAmount"
            value={transactionForm.totalAmount}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Payment Method</h3>
          <input
            type="input"
            className="input"
            name="paymentMethod"
            value={transactionForm.paymentMethod}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Status</h3>
          <input
            type="input"
            className="input"
            name="statusOrder"
            value={transactionForm.statusOrder}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Date of Sale</h3>
          <input
            type="date"
            className="input"
            name="saleDate"
            value={
              transactionForm.saleDate
                ? dayjs(transactionForm.saleDate).format("YYYY-MM-DD")
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
