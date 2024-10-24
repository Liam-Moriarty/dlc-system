// COMPONENTS
import { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

// ICONS
import { CiEdit } from "react-icons/ci";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";

// API SLICE
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDeleteClientMutation } from "../api/generalApi/clientApi";

const Dropdown = ({ items, openDropdownId, setOpenDropdownId }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const isOpen = openDropdownId === items._id; // Check if this dropdown is currently open

  const [deleteClient] = useDeleteClientMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteClient(id);
      if (response.error) {
        console.error("Error deleting client:", response.error);
      } else {
        console.log("Client deleted successfully");
        setOpenDropdownId(null); // Close dropdown after deletion
      }
    } catch (error) {
      console.log("Error deleting client: ", error.message);
    }
  };

  // UPDATE HANDLER
  const handleOpenUpdate = (e) => {
    e.preventDefault();
    setUpdateModal(!updateModal);
  };

  // DELETE HANDLER
  const handleOpenDelete = (e) => {
    e.preventDefault();
    setDeleteModal(!deleteModal);
  };

  const handleOpenDropdown = (e) => {
    e.preventDefault();
    // Toggle the dropdown state
    setOpenDropdownId(isOpen ? null : items._id);
  };

  const handleCloseDropdown = (e) => {
    e.preventDefault();
    // Toggle the dropdown state
    setOpenDropdownId(null);
  };

  return (
    <div className="relative">
      <Button
        icon={<CiMenuKebab size={23} />}
        onClick={handleOpenDropdown}
        variant="icon"
      />

      <div
        className={`absolute top-8 -left-24 lg:-left-20 z-[99] ${
          isOpen ? "block" : "hidden"
        } rounded-md p-2 bg-secondary-bg dark:bg-secondary-bg-dark dark:text-primary-txt-dark text-primary-txt text-sm font-medium`}
      >
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleOpenUpdate}
            variant="outline"
            children="Update"
            icon={<CiEdit />}
            className="w-full h-auto"
          />
          <Modal
            open={updateModal}
            handleOpen={handleOpenUpdate}
            label="Update Client Application"
            description="Submit the form below to update client application"
            items={items}
            formType="clients"
          />

          <Button
            variant="outline"
            children="Delete"
            onClick={handleOpenDelete}
            icon={<MdOutlineDeleteOutline />}
            className="w-full h-auto"
          />
          <Modal
            open={deleteModal}
            handleOpen={handleOpenDelete}
            handleDelete={handleDelete}
            label={`Delete ${items.company} to your list?`}
            description={
              <>
                This will permanently{" "}
                <span className="text-delete-btn font-bold text-base">
                  delete
                </span>{" "}
                {items.company} to the database are you sure for this?
              </>
            }
            deleteModal
            items={items}
          />

          <Button
            icon={<FaRegRectangleXmark />}
            variant="default"
            children="Cancel"
            onClick={handleCloseDropdown}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
