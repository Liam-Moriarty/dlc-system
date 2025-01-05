import React from "react";
import signupImg from "/images/desktop.png";
import LoginForm from "../components/LoginForm";
import ToggleTheme from "../components/ToggleTheme";

const Login = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="w-[75rem] h-[40rem] p-5 flex">
        <div className="w-full h-full dark:bg-secondary-bg-dark bg-secondary-bg shadow-xl md:hidden">
          <img
            src={signupImg}
            alt="signup image"
            className="w-full h-full object-contain"
          />
        </div>
        <LoginForm />
      </div>

      <div className="absolute bottom-10 right-10 flex rounded-full p-2 dark:bg-primary-accent-dark bg-secondary-accent">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Login;
