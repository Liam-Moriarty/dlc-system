// REACT PACKAGES
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import { productsCategory, productsStatus } from "../constants/clientConst";
import { uploadImage } from "../utils/uploadImageCloudinary";
import Button from "./Button";

// API
import { useAddProductsMutation } from "../api/generalApi/productsApi";
import {
  productData,
  cleanProductData,
} from "../features/formState/productSlice";

const ProductsForm = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productForm);
  const [addProducts] = useAddProductsMutation();

  const [productForm, setProductForm] = useState({
    product: productState.product || "",
    price: productState.price || "",
    category: productState.category || "",
    status: productState.status || "",
    description: productState.description || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleAddProduct = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !productForm.product ||
        !productForm.price ||
        !productForm.category ||
        !productForm.status ||
        !productForm.description ||
        !imageFile
      ) {
        return setError("All fields are required");
      }

      try {
        const uploadImageUrl = await uploadImage(imageFile);
        await addProducts({
          ...productForm,
          image: uploadImageUrl,
        });

        setProductForm({
          product: "",
          price: "",
          category: "",
          status: "",
          description: "",
          image: "",
        });
        dispatch(cleanProductData());
        setImageFile(null); // Reset image file
        setError("");
      } catch (error) {
        return setError("Error something went wrong");
      }
    },
    [productForm, imageFile, addProducts, dispatch]
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setImageFile(files[0]);
    } else {
      setProductForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      dispatch(productData({ [name]: value }));
    }
  };

  return (
    <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Product</h3>
          <input
            type="text"
            className="input"
            name="product"
            value={productForm.product}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Price</h3>
          <input
            type="number"
            className="input"
            name="price"
            value={productForm.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-5">
        <div className="flex flex-col gap-2">
          <h3>Category</h3>
          <select
            className="input"
            name="category"
            id="category"
            value={productForm.category}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Category
            </option>
            {productsCategory.map((category, key) => (
              <option key={key} value={category} className="option">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <h3>Status</h3>
          <select
            className="input"
            name="status"
            id="status"
            value={productForm.status}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="option">
              Select Status
            </option>
            {productsStatus.map((status, key) => (
              <option key={key} value={status} className="option">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <h3>Description</h3>
        <textarea
          className="input w-full h-40"
          name="description"
          id="description"
          value={productForm.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <h3>Image</h3>
        <input
          type="file"
          className="input w-full"
          name="image"
          onChange={handleChange}
        />
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
          onClick={handleAddProduct}
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

export default ProductsForm;
