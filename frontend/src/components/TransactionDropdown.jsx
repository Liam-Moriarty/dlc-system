import React, { useState } from "react";
import { useGetAllProductsQuery } from "../api/generalApi/productsApi";
import { useGetAllClientsQuery } from "../api/generalApi/clientApi";
import {
  transactionDiscount,
  transactionPaymentMethod,
  transactionStatus,
} from "../constants/transaction";
import dayjs from "dayjs";

const TransactionDropdown = ({ transactionForm, handleChange }) => {
  const { data: clients = [] } = useGetAllClientsQuery();
  const { data: products = [] } = useGetAllProductsQuery();

  // Helper function to calculate total
  const calculateTotal = () => {
    const price = parseFloat(transactionForm.price || 0);
    const quantity = parseFloat(transactionForm.quantity || 0);
    const discount =
      transactionForm.priceAtSale &&
      transactionForm.priceAtSale !== "no discount"
        ? parseFloat(transactionForm.priceAtSale) / 100
        : 0; // Treat "No Discount" as 0%

    const discountAmount = price * discount;
    const discountedPrice = price - discountAmount;
    const totalCost = discountedPrice * quantity;

    transactionForm.total = totalCost.toFixed(2);
    return totalCost.toFixed(2);
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    const price = selectedProduct?.price || "";

    handleChange({
      target: { name: "price", value: price },
    });
    handleChange(e);
  };

  const total = calculateTotal();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Company</h3>
          <select
            className="input"
            name="clientId"
            id="clientId"
            value={transactionForm.clientId}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Company
            </option>
            {clients.map((client, key) => (
              <option key={key} value={client._id} className="option">
                {client.company}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Products</h3>
          <select
            className="input"
            name="productId"
            id="productId"
            value={transactionForm.productId}
            onChange={handleProductChange}
          >
            <option value="" disabled hidden className="option">
              Select product
            </option>
            {products.map((product, key) => (
              <option key={key} value={product._id} className="option">
                {product.product}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Price</h3>
          <input
            type="number"
            className="input"
            name="price"
            value={transactionForm.price}
            readOnly
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
          <h3>Discount</h3>
          <select
            className="input"
            name="priceAtSale"
            id="priceAtSale"
            value={transactionForm.priceAtSale}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Status
            </option>
            {transactionDiscount.map((discount, key) => (
              <option key={key} value={discount.value} className="option">
                {discount.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Total</h3>
          <input
            type="number"
            className="input"
            name="total"
            value={total}
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-5">
        <div className="flex flex-col gap-2">
          <h3>Status</h3>
          <select
            className="input"
            name="statusOrder"
            id="statusOrder"
            value={transactionForm.statusOrder}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Status
            </option>
            {transactionStatus.map((category, key) => (
              <option key={key} value={category} className="option">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Payment Method</h3>
          <select
            className="input"
            name="paymentMethod"
            id="paymentMethod"
            value={transactionForm.paymentMethod}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Payment
            </option>
            {transactionPaymentMethod.map((status, key) => (
              <option key={key} value={status} className="option">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 my-5">
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
    </>
  );
};

export default TransactionDropdown;
