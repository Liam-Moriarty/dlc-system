import React, { useEffect, useState } from "react";
import {
  AiOutlineUsergroupAdd,
  AiOutlineUserAdd,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineKey,
  AiOutlineSolution,
} from "react-icons/ai";
import Button from "./Button";
import { useSignupMutation } from "../api/authApi/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cleanSignUp, createSignup } from "../features/auth/signUpSlice";
import { roles } from "../constants/othersConst";

const SignupForm = () => {
  const signUpState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const [signUpForm, setSignUpForm] = useState({
    name: signUpState.name || "",
    username: signUpState.username || "",
    email: signUpState.email || "",
    password: signUpState.password || "",
    confirmPassword: signUpState.confirmPassword || "",
    role: signUpState.role || "",
    passwordChangeDate: new Date(),
  });
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    setSignUpForm((prev) => ({ ...prev, passwordChangeDate: new Date() }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, username, email, password, confirmPassword, role } =
      signUpForm;

    try {
      const payload = {
        name,
        username,
        email,
        password,
        confirmPassword,
        role,
        passwordChangeDate: new Date(),
      };

      const result = await signup(payload).unwrap();

      // store the token into local storage
      localStorage.setItem("signup", JSON.stringify(result));

      console.log("User signed up successfully:", result);

      setSignUpForm({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      dispatch(cleanSignUp());
      setError("");
      setEmptyFields([]);

      navigate("/login");
    } catch (error) {
      // Extract error message from the backend response
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

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(createSignup({ [name]: value }));
  };
  return (
    <form
      className="w-full h-full p-4 md:p-2 flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full text-center leading-9 mb-5">
        <h1 className="text-2xl md:text-lg dark:text-secondary-txt-dark text-secondary-txt">
          Sign Up
        </h1>
        <p className="text-base font-medium md:text-sm">
          Your admin journey starts here!
        </p>
      </div>

      {/* INPUTS */}
      <div className="w-8/12 sm:w-full h-auto flex flex-col gap-2 mb-5">
        <div
          className={`container-signup-login ${
            emptyFields.includes("name")
              ? "error"
              : "border-b border-primary-borders dark:border-primary-borders-dark"
          }`}
        >
          <AiOutlineUsergroupAdd size={20} className="icon-signup-login" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input-signup-login"
            onChange={handleChange}
            value={signUpForm.name.toLowerCase()}
          />
        </div>
        <div
          className={`container-signup-login ${
            emptyFields.includes("email") ||
            error === "Please enter a valid email"
              ? "error"
              : "border-b border-primary-borders dark:border-primary-borders-dark"
          }`}
        >
          <AiOutlineMail size={20} className="icon-signup-login" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input-signup-login"
            onChange={handleChange}
            value={signUpForm.email}
          />
        </div>
        <div
          className={`container-signup-login ${
            emptyFields.includes("password") ||
            error === "password didn't match"
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
            value={signUpForm.password}
          />
        </div>
        <div
          className={`container-signup-login ${
            emptyFields.includes("confirmPassword") ||
            error === "password didn't match"
              ? "error"
              : "border-b border-primary-borders dark:border-primary-borders-dark"
          }`}
        >
          <AiOutlineKey size={20} className="icon-signup-login" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="input-signup-login"
            onChange={handleChange}
            value={signUpForm.confirmPassword}
          />
        </div>

        <div className="flex gap-2 justify-start items-center">
          <div
            className={`container-signup-login ${
              emptyFields.includes("username")
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
              value={signUpForm.username.toLowerCase()}
            />
          </div>

          <div
            className={`container-signup-login ${
              emptyFields.includes("role")
                ? "error"
                : "border-b border-primary-borders dark:border-primary-borders-dark"
            }`}
          >
            <AiOutlineSolution size={20} className="icon-signup-login" />
            <select
              className="input-signup-login"
              name="role"
              id="role"
              value={signUpForm.role.toLowerCase()}
              onChange={handleChange}
            >
              <option value="" disabled hidden className="option">
                Role
              </option>
              {roles.map((role, key) => (
                <option key={key} value={role._id} className="option">
                  {role.role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <p className="!text-red-500 font-semibold text-center mb-3 capitalize">
          {error}
        </p>
      )}

      <div className="w-full h-auto flex flex-col items-center gap-3">
        <Button children="Sign up" variant="default" submit className="w-1/4" />
        <p className="text-xs font-normal capitalize">
          Already have an account?{" "}
          <span>
            <Link
              to="/login"
              className="text-blue-500 font-medium underline italic cursor-pointer capitalize"
            >
              Login
            </Link>
          </span>{" "}
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
