import React from "react";

const Button = ({ children, icon, variant, className, onClick, submit }) => {
  const baseStyle =
    "font-medium px-4 py-2 text-sm rounded-md inline-flex justify-center items-center whitespace-nowrap gap-1 lg:px-2 sm:text-xs";

  const variants = {
    default:
      "bg-primary-accent dark:bg-primary-accent-dark border-primary-borders dark:border-primary-borders-dark text-primary-overlay-txt  dark:text-primary-txt-dark",
    outline:
      "bg-transparent border border-primary-borders dark:border-primary-borders-dark text-primary-txt dark:text-primary-txt-dark",
    secondary:
      "bg-secondary-accent dark:bg-secondary-accent-dark border-primary-borders dark:border-primary-borders-dark text-primary-txt dark:text-primary-txt-dark",
  };

  const buttonStyle = `${baseStyle} ${variants[variant] || " "}  ${className}`;

  return (
    <button
      className={buttonStyle}
      onClick={onClick}
      submit={submit ? "submit" : "button"}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
