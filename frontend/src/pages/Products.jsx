// REACT PACKAGES
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

// COMPONENTS IMPORTS
import ProductsCards from "../components/ProductsCards";
import Button from "../components/Button";
import Modal from "../components/Modal";

// API IMPORTS
import { useGetAllProductsQuery } from "../api/generalApi/productsApi";

const Products = () => {
  const [open, setIsOpen] = useState(false);
  const tabletView = useMediaQuery({ maxWidth: 768 });

  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleOpen = (e) => {
    e.preventDefault();
    setIsOpen(!open);
  };

  return (
    <>
      {!tabletView ? (
        <div className="relative w-full h-[47rem] md:h-full flex justify-between overflow-visible bg-primary-bg dark:bg-primary-bg-dark">
          <ProductsCards data={data} error={error} isLoading={isLoading} />
          <Button
            icon={<IoMdAdd size={23} style={{ color: "#f8f1f0" }} />}
            onClick={handleOpen}
            variant="icon"
            className="absolute w-12 h-12 rounded-full bottom-0 right-12 z-[999] dark:bg-primary-accent-dark 
            bg-primary-accent"
          ></Button>

          <Modal
            open={open}
            handleOpen={handleOpen}
            label="Add Products"
            description="Enter submit to add products"
            formType="products"
          />
        </div>
      ) : (
        <p>Mobile View Here</p>
      )}
    </>
  );
};

export default Products;
