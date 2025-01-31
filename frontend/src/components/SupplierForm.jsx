// PACKAGE
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import Button from "./Button";

// API SLICE
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "../api/inventoryApi/supplierApi";
import {
  supplierData,
  cleanSupplier,
} from "../features/formState/supplierSlice";

const SupplierForm = ({ handleOpen, items }) => {
  const dispatch = useDispatch();
  const supplierState = useSelector((state) => state.supplierForm);

  const [supplierForm, setSupplierForm] = useState({
    suppliers: supplierState.suppliers || "",
    email: supplierState.email || "",
    contacts: supplierState.contacts || "",
    location: supplierState.location || "",
  });
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const [createSupplier] = useCreateSupplierMutation();
  const [updateSupplier] = useUpdateSupplierMutation();

  // Sync form state with client data when client prop changes
  // checks if the data is not empty and if its not give the corresponding items to the form
  useEffect(() => {
    if (items) {
      setSupplierForm({
        suppliers: items.suppliers || "",
        email: items.email || "",
        contacts: items.contacts || "",
        location: items.location || "",
      });
    }
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        suppliers: supplierForm.suppliers,
        email: supplierForm.email,
        contacts: supplierForm.contacts,
        location: supplierForm.location,
      };

      let result;
      if (items) {
        result = await updateSupplier({
          id: items._id,
          ...payload,
        });
      } else {
        result = await createSupplier(payload).unwrap();
      }

      if (result.error) {
        throw result.error; // Throw the error if it exists
      }

      setSupplierForm({
        suppliers: "",
        email: "",
        contacts: "",
        location: "",
      });

      dispatch(cleanSupplier());

      setError("");
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong";
      const emptyFieldsMessage =
        error?.data?.emptyFields || "Something went wrong";

      setError(errorMessage);
      setEmptyFields(emptyFieldsMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    dispatch(supplierData({ [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form
        className="w-full text-primary-txt dark:text-primary-txt-dark p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 mb-5">
          <h3>Supplier Name</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("suppliers")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark"
            }`}
            name="suppliers"
            value={supplierForm.suppliers}
            onChange={handleChange}
            placeholder="Enter suppliers name"
          />

          <h3>Contacts</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("contacts") ||
              error === "Contacts must be a 10-digit number starting with 9"
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="contacts"
            maxLength="10" // Limit the input to 10 characters
            value={supplierForm.contacts}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only digits and ensure the length doesn't exceed 10
              if (/^\d{0,10}$/.test(value)) {
                handleChange(e); // Call the existing handleChange function
              }
            }}
            placeholder="Enter 10-digit contact"
          />

          <h3>Email</h3>
          <input
            type="email"
            className={`input ${
              emptyFields.includes("email") ||
              error === "Please enter a valid email!!" ||
              error === "Email is already use try another one"
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="email"
            value={supplierForm.email}
            onChange={handleChange}
            placeholder="How should we message you?"
          />

          <h3>Location</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("location")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="location"
            value={supplierForm.location}
            onChange={handleChange}
            placeholder="Where you from?"
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
            onClick={handleSubmit}
            className="w-full"
            children="Submit"
            submit
          />

          <Button
            variant="outline"
            onClick={handleOpen}
            className="w-full"
            children="Cancel"
          />
        </div>
      </form>
    </>
  );
};

export default SupplierForm;
