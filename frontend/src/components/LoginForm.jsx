import React, { useState } from "react";
import { AiOutlineUserAdd, AiOutlineLock } from "react-icons/ai";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../api/authApi/authApi";
import { createLogin } from "../features/auth/authSlice";

const LoginForm = () => {
  const loginState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = loginForm;

    try {
      const payload = { username, password };

      const result = await login(payload).unwrap();

      localStorage.setItem("token", result.result);
      localStorage.setItem("username", result.username);
      localStorage.setItem("profile", result.profilePic);
      localStorage.setItem("role", result.role);
      localStorage.setItem("name", result.name);

      setLoginForm({
        username: "",
        password: "",
      });
      setError("");
      dispatch(
        createLogin({ username: result.username, token: result.result })
      );

      navigate("/");
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong";
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    if (!error) {
      setError("");
    }

    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="w-full h-full p-4 flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full text-center leading-9 mb-5">
        <h1 className="text-2xl md:text-lg dark:text-secondary-txt-dark text-secondary-txt">
          Login
        </h1>
        <p className="text-base font-medium md:text-sm">
          Welcome back, your admin toolbox awaits.
        </p>
      </div>

      {/* INPUTS */}
      <div className="w-8/12 sm:w-full h-auto flex flex-col gap-2 mb-5">
        <div
          className={`container-signup-login ${
            error === "Username or Password is empty" ||
            error === "Username doesn't exist"
              ? "error"
              : "border-b border-primary-borders dark:border-primary-borders-dark"
          }`}
        >
          <AiOutlineUserAdd size={20} className="icon-signup-login" />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="input-signup-login"
            onChange={handleChange}
            value={loginForm.username}
          />
        </div>
        <div
          className={`container-signup-login ${
            error === "Username or Password is empty" ||
            error === "Invalid password"
              ? "error"
              : "border-b border-primary-borders dark:border-primary-borders-dark"
          }`}
        >
          <AiOutlineLock size={20} className="icon-signup-login" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input-signup-login"
            onChange={handleChange}
            value={loginForm.password}
          />
        </div>
      </div>

      {error && (
        <p className="!text-red-500 font-semibold text-center mb-3 capitalize">
          {error}
        </p>
      )}

      <div className="w-full h-auto flex flex-col items-center gap-3">
        <Button children="Login" variant="default" submit className="w-1/4" />
        <p className="text-xs font-normal capitalize">
          Don't have an account?{" "}
          <span>
            <Link
              to="/sign-up"
              className="text-blue-500 font-medium underline italic cursor-pointer capitalize"
            >
              Sign Up
            </Link>
          </span>{" "}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
