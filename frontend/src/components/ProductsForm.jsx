// REACT PACKAGES
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import { productsCategory, productsStatus } from "../constants/productConst";
import { uploadImage } from "../utils/uploadImageCloudinary";
import Button from "./Button";

// API
import {
  useAddProductsMutation,
  useUpdateProductsMutation,
} from "../api/generalApi/productsApi";
import {
  productData,
  cleanProductData,
} from "../features/formState/productSlice";

const ProductsForm = ({ handleOpen, items }) => {
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productForm);

  const [addProducts, { isLoading }] = useAddProductsMutation();
  const [updateProducts] = useUpdateProductsMutation();

  const [productForm, setProductForm] = useState({
    product: productState.product || "",
    price: productState.price || "",
    quantityInStock: productState.quantityInStock || "",
    reorderLevel: productState.reorderLevel || "",
    category: productState.category || "",
    status: productState.status || "",
    description: productState.description || "",
  });

  useEffect(() => {
    if (items) {
      setProductForm({
        product: items.product || "",
        price: items.price || "",
        quantityInStock: items.quantityInStock || "",
        reorderLevel: items.reorderLevel || "",
        category: items.category || "",
        status: items.status || "",
        description: items.description || "",
        image: items.image || "",
      });
    }
  }, [items]);

  const handleAddProduct = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const uploadImageUrl = await uploadImage(imageFile);

        const payload = {
          product: productForm.product,
          price: productForm.price,
          quantityInStock: productForm.quantityInStock,
          reorderLevel: productForm.reorderLevel,
          category: productForm.category,
          status: productForm.status,
          description: productForm.description,
          image: uploadImageUrl,
        };

        let result;
        if (items) {
          result = await updateProducts({
            id: items._id,
            ...payload,
          });
        } else {
          result = await addProducts(payload);
        }

        if (result.error) {
          throw result.error; // Throw the error if it exists
        }

        setProductForm({
          product: "",
          price: "",
          quantityInStock: "",
          reorderLevel: "",
          category: "",
          status: "",
          description: "",
          image: "",
        });
        dispatch(cleanProductData());
        setImageFile(null); // Reset image file
        setError("");
        setEmptyFields([]);
      } catch (error) {
        const errorMessage = error?.data?.message || "Something went wrong";
        const emptyFieldsMessage =
          error?.data?.emptyFields || "Something went wrong";

        setError(errorMessage);
        setEmptyFields(emptyFieldsMessage);
      }
    },
    [productForm, imageFile, addProducts, dispatch, items]
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
      {items && (
        <div className="flex justify-center items-center mb-5">
          <img
            src={items.image.replace(/\.(jpg|png|webp)/, ".jpg")}
            alt="products image"
            className="w-20 h-20 object-cover rounded-full border-2 dark:border-primary-borders-dark border-primary-borders"
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Product</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("product")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="product"
            value={productForm.product}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Price</h3>
          <input
            type="number"
            className={`input ${
              emptyFields.includes("price")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="price"
            value={productForm.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="flex flex-col gap-2">
          <h3>Stock</h3>
          <input
            type="number"
            className={`input ${
              emptyFields.includes("quantityInStock")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="quantityInStock"
            value={productForm.quantityInStock}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3>Restock Level</h3>
          <input
            type="number"
            className={`input ${
              emptyFields.includes("reorderLevel")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="reorderLevel"
            value={productForm.reorderLevel}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-5">
        <div className="flex flex-col gap-2">
          <h3>Category</h3>
          <select
            className={`input ${
              emptyFields.includes("category")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
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
            className={`input ${
              emptyFields.includes("status")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
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
          className={`input w-full h-40 ${
            emptyFields.includes("description")
              ? "border-red-500"
              : "border-primary-borders dark:border-primary-borders-dark "
          }`}
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
          className={`input w-full ${
            emptyFields.includes("image")
              ? "border-red-500"
              : "border-primary-borders dark:border-primary-borders-dark "
          }`}
          name="image"
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="!text-red-500 font-semibold text-center normal-case mb-2 ">
          {error}
        </p>
      )}

      <div className="flex gap-3 flex-col">
        <Button
          variant="default"
          className="w-full"
          children={`${isLoading ? "Adding..." : "Submit"}`}
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
