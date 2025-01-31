// PACKAGE IMPORTS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import Button from "./Button";

// API ACTIONS
import {
  cleanMovement,
  movementData,
} from "../features/formState/movementSlice";

// QUERY
import {
  useCreateMovementMutation,
  useUpdateMovementMutation,
} from "../api/inventoryApi/movementApi";
import MovementDropdown from "./MovementDropdown";

const MovementForm = ({ handleOpen, items }) => {
  const dispatch = useDispatch();
  const movementState = useSelector((state) => state.movementForm);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const [createMovement] = useCreateMovementMutation();
  const [updateMovement] = useUpdateMovementMutation();

  const [movementForm, setMovementForm] = useState({
    suppliersId: movementState.suppliersId || "",
    productDetails: movementState.productDetails || "",
    type: movementState.type || "",
    movementStatus: movementState.movementStatus || "",
    quantity: movementState.quantity || "",
    location: movementState.location || "",
    createdBy: movementState.createdBy || "",
  });

  const assignAdmin = window.localStorage.getItem("username");

  useEffect(() => {
    setMovementForm((prevForm) => ({ ...prevForm, createdBy: assignAdmin }));
  }, [assignAdmin, setMovementForm]);

  useEffect(() => {
    if (items) {
      const updatedMovementForm = {
        suppliersId: items.suppliersId || "",
        productDetails: items.productDetails || "",
        type: items.type || "",
        movementStatus: items.movementStatus || "",
        quantity: items.quantity || "",
        location: items.location || "",
        createdBy: items.createdBy || "",
      };
      setMovementForm(updatedMovementForm);
    }
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      suppliersId,
      productDetails,
      type,
      movementStatus,
      quantity,
      location,
      createdBy,
    } = movementForm;

    try {
      const payload = {
        suppliersId,
        productDetails,
        type,
        movementStatus,
        quantity,
        location,
        createdBy,
      };

      let result;
      if (items) {
        result = await updateMovement({
          id: items._id,
          ...payload,
        });
      } else {
        result = await createMovement(payload);
      }

      if (result.error) {
        throw result.error; // Throw the error if it exists
      }

      setMovementForm({
        suppliersId: "",
        productDetails: "",
        type: "",
        movementStatus: "",
        quantity: "",
        location: "",
        createdBy: "",
      });
      dispatch(cleanMovement());
      setError("");
      setEmptyFields([]);
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

    if (error) {
      setError("");
    }

    setMovementForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(movementData({ [name]: value }));
  };

  return (
    <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
      <MovementDropdown
        movementForm={movementForm}
        assignAdmin={assignAdmin}
        handleChange={handleChange}
        emptyFields={emptyFields}
      />

      {error && (
        <p className="!text-red-500 font-semibold text-center normal-case mb-2 ">
          {error}
        </p>
      )}

      <div className="flex gap-3 flex-col">
        <Button
          variant="default"
          className="w-full"
          children="Submit"
          submit
          onClick={handleSubmit}
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

export default MovementForm;
