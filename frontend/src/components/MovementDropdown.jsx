import React, { useState } from "react";
import {
  useGetAllSuppliersQuery,
  useGetAllAggregatedProductsQuery,
} from "../api/inventoryApi/movementApi";

import { movementStatus, movementType } from "../constants/movementConst";

const MovementDropdown = ({
  movementForm,
  assignAdmin,
  handleChange,
  emptyFields,
}) => {
  const { data: suppliers = [] } = useGetAllSuppliersQuery();
  const { data: products = [] } = useGetAllAggregatedProductsQuery();

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Supplier</h3>
          <select
            className={`input ${
              emptyFields.includes("suppliersId")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="suppliersId"
            id="suppliersId"
            value={movementForm.suppliersId}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Supplier
            </option>
            {suppliers.map((supplier, key) => (
              <option key={key} value={supplier._id} className="option">
                {supplier.suppliers}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Products</h3>
          <select
            className={`input ${
              emptyFields.includes("productDetails")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="productDetails"
            id="productDetails"
            value={movementForm.productDetails}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select product
            </option>
            {products.map((product, key) => (
              <option key={key} value={product._id} className="option">
                {product.products}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Quantity</h3>
          <input
            type="number"
            className={`input ${
              emptyFields.includes("quantity")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="quantity"
            value={movementForm.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Type</h3>
          <select
            className={`input ${
              emptyFields.includes("type")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="type"
            id="type"
            value={movementForm.type}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Type
            </option>
            {movementType.map((category, key) => (
              <option key={key} value={category} className="option">
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-5">
        <div className="flex flex-col gap-2">
          <h3>Status</h3>
          <select
            className={`input ${
              emptyFields.includes("movementStatus")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="movementStatus"
            id="movementStatus"
            value={movementForm.movementStatus}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Status
            </option>
            {movementStatus.map((status, key) => (
              <option key={key} value={status} className="option">
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Location</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("location")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="location"
            value={movementForm.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <h3>Assign Admin</h3>
        <input
          type="text"
          className={`input border-primary-borders dark:border-primary-borders-dark `}
          name="createdBy"
          value={assignAdmin} // Use the assignAdmin variable as the value
          readOnly // Make the input field read-only so user cant change it
        />
      </div>
    </>
  );
};

export default MovementDropdown;
