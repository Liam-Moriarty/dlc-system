import React, { useState } from "react";
import Button from "./Button";
import { useDeleteProductsMutation } from "../api/generalApi/productsApi";
import Modal from "./Modal";

const ProductsCards = ({ data, error, isLoading }) => {
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [deleteProducts] = useDeleteProductsMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteProducts(id);
      if (response.error) {
        console.log("Error deleting products", response.error);
      } else {
        console.log("Successfully deleting product");
      }
    } catch (error) {
      console.log("Error deleting products", error.message);
    }
  };

  const handleDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModal(!deleteModal);
  };

  if (isLoading) return <p>...Loading Data</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 w-full h-full grid grid-cols-4 lg:grid-cols-4 gap-6 overflow-auto ">
      {data &&
        data.map((item) => (
          <div
            key={item._id}
            className="w-full xxl:w-full h-auto flex flex-col gap-2"
          >
            {/* IMG */}
            <div className="w-full h-full">
              <img
                src={item.image.replace(/\.(jpg|png|webp)/, ".jpg")}
                alt="products images"
                loading="lazy"
                className="w-full h-[15rem] object-cover rounded-md"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="w-full h-full flex flex-col">
              <div className="flex flex-col">
                <p className="dark:text-secondary-txt-dark text-secondary-txt text-base font-medium line-clamp-2">
                  Product:{" "}
                  <span className="dark:text-primary-txt-dark text-primary-txt font-normal uppercase">
                    {item.product}
                  </span>
                </p>
                <p className="dark:text-secondary-txt-dark text-secondary-txt text-base font-medium">
                  Category:{" "}
                  <span className="dark:text-primary-txt-dark text-primary-txt font-normal">
                    {item.category}
                  </span>
                </p>
                <p className="dark:text-secondary-txt-dark text-secondary-txt text-base font-medium">
                  Price:{" "}
                  <span className="dark:text-primary-txt-dark text-primary-txt font-normal">
                    ₱{item.price}
                  </span>
                </p>
                <p className="dark:text-secondary-txt-dark text-secondary-txt text-base font-medium">
                  Status:{" "}
                  <span className="dark:text-primary-txt-dark text-primary-txt font-normal">
                    {item.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-col w-full h-full">
                <p className="dark:text-secondary-txt-dark text-secondary-txt text-base font-medium line-clamp-2">
                  description:{" "}
                  <span className="dark:text-primary-txt-dark text-primary-txt font-normal w-full ">
                    {item.description}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-2">
              <Button children="Update" variant="default" />
              <Button
                children="Delete"
                variant="delete"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}

      {/* <Modal
        open={deleteModal}
        handleOpen={handleDeleteModal}
        handleDelete={handleDelete}
        label={`Delete ${data.product} to your list?`}
        description={
          <>
            This will permanently{" "}
            <span className="text-delete-btn font-bold text-base">delete</span>{" "}
            {data.product} to the database are you sure for this?
          </>
        }
        deleteModal
        items={data}
      /> */}
    </div>
  );
};

export default ProductsCards;
