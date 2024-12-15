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

    if (
      !clientForm.company ||
      !clientForm.contacts ||
      !clientForm.email ||
      !clientForm.city
    ) {
      return setError("All fields are required!!");
    }

    try {
      const payload = {
        company: clientForm.company,
        contacts: clientForm.contacts,
        email: clientForm.email,
        city: clientForm.city,
      };

      if (items) {
        await updateClient({
          id: items._id,
          ...payload,
        });
      } else {
        await createClient(payload);
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
      return setError("Something went wrong!");
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
      <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
        <div className="flex flex-col gap-3 mb-5">
          <h3>Company Name</h3>
          <input
            type="text"
            className="input"
            name="company"
            value={clientForm.company}
            onChange={handleChange}
          />

          <h3>Contacts</h3>
          <input
            type="text"
            className="input"
            name="contacts"
            value={clientForm.contacts}
            onChange={handleChange}
          />

          <h3>Email</h3>
          <input
            type="email"
            className="input"
            name="email"
            value={clientForm.email}
            onChange={handleChange}
          />

          <h3>City</h3>
          <input
            type="text"
            className="input"
            name="city"
            value={clientForm.city}
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
