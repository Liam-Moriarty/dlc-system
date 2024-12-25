import React from "react";

const Button = ({ children, icon, variant, className, onClick, submit }) => {
  const baseStyle =
    "font-medium text-sm inline-flex justify-center items-center whitespace-nowrap gap-1 lg:px-2 lg:text-xs px-4 py-2 dark:text-primary-txt-dark";

  const variants = {
    default:
      "bg-primary-accent dark:bg-primary-accent-dark text-primary-overlay-txt hover:dark:bg-primary-hover-dark hover:bg-primary-hover rounded-md",
    outline:
      "bg-transparent border border-primary-borders dark:border-primary-borders-dark text-primary-txt hover:dark:bg-secondary-accent-dark hover:bg-secondary-accent rounded-md",
    secondary:
      "bg-secondary-accent dark:bg-secondary-accent-dark border-primary-borders dark:border-primary-borders-dark text-primary-txt rounded-md",
    icon: "text-primary-txt p-1 flex justify-center items-center",
    delete:
      "bg-delete-btn dark:bg-delete-btn text-primary-overlay-txt hover:dark:bg-delete-btn-hover hover:bg-delete-btn-hover rounded-md",
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
