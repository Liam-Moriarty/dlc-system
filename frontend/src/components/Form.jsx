// PACKAGE
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import Button from "./Button";

// API SLICE
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../api/generalApi/clientApi";
import { clientData, cleanData } from "../features/formState/clientSlice";

const Form = ({ handleOpen, items }) => {
  const dispatch = useDispatch();
  const clientState = useSelector((state) => state.clientForm);

  const [clientForm, setClientForm] = useState({
    company: clientState.company || "",
    contacts: clientState.contacts || "",
    email: clientState.email || "",
    city: clientState.city || "",
  });
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  // Sync form state with client data when client prop changes
  // checks if the data is not empty and if its not give the corresponding items to the form
  useEffect(() => {
    if (items) {
      setClientForm({
        company: items.company || "",
        contacts: items.contacts || "",
        email: items.email || "",
        city: items.city || "",
      });
    }
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        company: clientForm.company,
        contacts: clientForm.contacts,
        email: clientForm.email,
        city: clientForm.city,
      };

      let result;
      if (items) {
        result = await updateClient({
          id: items._id,
          ...payload,
        });
      } else {
        result = await createClient(payload).unwrap();
      }

      if (result.error) {
        throw result.error; // Throw the error if it exists
      }

      setClientForm({
        company: "",
        contacts: "",
        email: "",
        city: "",
      });

      dispatch(cleanData());

      setError("");
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong";
      const emptyFieldsMessage =
        error?.data?.emptyFields || "Something went wrong";

      setError(errorMessage);
      setEmptyFields(emptyFieldsMessage);

      console.log("errorMessage details:", errorMessage); // Log for debugging
      console.log("emptyFieldsMessage details:", emptyFieldsMessage); // Log for debugging
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    dispatch(clientData({ [e.target.name]: e.target.value }));
  };

  return (
    <>
      <form
        className="w-full text-primary-txt dark:text-primary-txt-dark p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 mb-5">
          <h3>Company Name</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("company")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark"
            }`}
            name="company"
            value={clientForm.company}
            onChange={handleChange}
            placeholder="Enter Company name"
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
            value={clientForm.contacts}
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
              error === "Please enter a valid email!!"
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="email"
            value={clientForm.email}
            onChange={handleChange}
            placeholder="How should we message you?"
          />

          <h3>City</h3>
          <input
            type="text"
            className={`input ${
              emptyFields.includes("city")
                ? "border-red-500"
                : "border-primary-borders dark:border-primary-borders-dark "
            }`}
            name="city"
            value={clientForm.city}
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

export default Form;
