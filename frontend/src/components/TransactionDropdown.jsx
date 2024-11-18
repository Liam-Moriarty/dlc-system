import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import {
  useGetUniqueClientsQuery,
  useGetUniqueProductsQuery,
} from "../api/generalApi/productsApi";

const TransactionDropdown = ({ transactionForm }) => {
  const { data: uniqueProducts } = useGetUniqueProductsQuery();
  const { data: uniqueClients } = useGetUniqueClientsQuery();

  const [isDropdownOpenProducts, setIsDropdownOpenProducts] = useState(false); // control of dropdown for products
  const [isDropdownOpenClients, setIsDropdownOpenClients] = useState(false); // control of dropdown for clients

  const handleSelectProduct = (product) => {
    transactionForm.productName = product;
    setIsDropdownOpenProducts(false); // close after selecting product
  };

  const handleSelectClient = (client) => {
    transactionForm.clientName = client;
    setIsDropdownOpenClients(false);
  };

  const handleOpenProducts = () => {
    setIsDropdownOpenProducts(!isDropdownOpenProducts);

    if (isDropdownOpenClients) {
      setIsDropdownOpenClients(false);
    }
  };

  const handleOpenClients = () => {
    setIsDropdownOpenClients(!isDropdownOpenClients);

    if (isDropdownOpenProducts) {
      setIsDropdownOpenProducts(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-5">
      <div className="flex flex-col gap-2">
        <h3>Product</h3>
        {/* CUSTOM DROPDOWN PRODUCTS */}
        <div className="relative">
          <div
            className="input cursor-pointer flex justify-between items-center"
            onClick={handleOpenProducts}
          >
            {/* Default is Select Product when Clicked then the value of 
          selected product will show  */}
            {transactionForm.productName || "Select Product"}
            <HiChevronDown size={20} />
          </div>
        </div>

        {/* DROPDOWN OPTIONS */}
        {isDropdownOpenProducts && (
          <div className="absolute z-10 top-24 -left-20 w-3/5 border-2 dark:border-primary-borders-dark border-primary-borders rounded shadow-lg max-h-[15rem] overflow-y-auto">
            <ul>
              {uniqueProducts?.length > 0 ? (
                uniqueProducts.map((product, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectProduct(product)}
                    className="px-4 py-2 bg-secondary-bg dark:bg-secondary-bg-dark capitalize text-sm font-normal cursor-pointer "
                  >
                    {product}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  No products available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* CUSTOM CLIENTS DROPDOWN */}
      <div className="flex flex-col gap-2">
        <h3>Clients</h3>
        <div className="relative">
          <div
            className="input cursor-pointer flex justify-between items-center"
            onClick={handleOpenClients}
          >
            {transactionForm.clientName || "Select Clients"}
            <HiChevronDown size={20} />
          </div>
        </div>

        {isDropdownOpenClients && (
          <div className="absolute z-10 top-24 -right-20 w-3/5 border-2 dark:border-primary-borders-dark border-primary-borders rounded shadow-lg max-h-[15rem] overflow-y-auto">
            <ul>
              {uniqueClients?.length > 0 ? (
                uniqueClients.map((client, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectClient(client)}
                    className="px-4 py-2 bg-secondary-bg dark:bg-secondary-bg-dark capitalize text-sm font-normal cursor-pointer "
                  >
                    {client}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">
                  No clients available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDropdown;
