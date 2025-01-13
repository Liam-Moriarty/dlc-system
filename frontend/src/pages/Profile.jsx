import React, { useState } from "react";
import pfp from "/images/pfp-1.jfif";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { roles } from "../constants/othersConst";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "../api/generalApi/adminApi";
import { uploadImage } from "../utils/uploadImageCloudinary";

const Settings = () => {
  const theme = useSelector((state) => state.theme.mode);
  const profileBg = theme === "dark" ? "gradient-dark" : "gradient";

  const profilePic = window.localStorage.getItem("profile");
  const name = window.localStorage.getItem("name");
  const role = window.localStorage.getItem("role");

  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewPic, setPreviewPic] = useState(profilePic);

  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    profilePic: "",
  });

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(
        Object.entries(profile).filter(([key, value]) => value.trim() !== "")
      );

      // If a new image file is selected, upload and add the URL to the payload
      if (imageFile) {
        const uploadImageUrl = await uploadImage(imageFile);
        payload.profilePic = uploadImageUrl; // Add the uploaded image URL to the payload
      }

      const result = await updateProfile(payload).unwrap();

      console.log(result);

      setProfile({
        name: "",
        username: "",
        email: "",
        role: "",
        profilePic: "",
      });
      setError("");
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong";
      setError(errorMessage);
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    const { currentPassword, password, confirmPassword } = passwordChange;

    try {
      const payload = { currentPassword, password, confirmPassword };
      const result = await changePassword(payload).unwrap();

      console.log(result);

      setPasswordChange({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
      setErrorPassword("");
    } catch (error) {
      const errorMessage = error?.data.message || "Something went wrong";
      console.log(error);

      setErrorPassword(errorMessage);
    }
  };

  const profileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const passworHandledChange = (e) => {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewPic(previewUrl);
      setImageFile(file);
    }
  };

  return (
    <div className="w-full h-full overflow-auto flex-1">
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-1 gap-5 p-5">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5">
          {/* PROFILE PHOTO */}
          <div className="relative w-full h-[15rem] lg:row-span-2 profile-container items-center">
            <div className={`relative w-full h-3/6 rounded-xl ${profileBg}`}>
              <img
                src={previewPic ? previewPic : pfp}
                alt="profile picture"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/5 w-20 h-20 
                rounded-full object-cover border-2 border-primary-borders-dark"
              />
            </div>

            <div className="absolute bottom-9 text-center">
              <h1 className="leading-snug">{name ? name : "Unauthorized"}</h1>
              <p>
                <span className="text-blue-500 font-semibold">
                  Admin position:{" "}
                </span>{" "}
                {role ? role : null}
              </p>
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="w-full h-[35rem] profile-container">
            <div className="mb-5">
              <h1 className="leading-snug">Account Settings</h1>
              <p>Here you can change your account information</p>
            </div>

            <form className="w-full" onSubmit={submitProfile}>
              <div className="flex flex-col gap-1 mb-5">
                <h3>Name</h3>
                <input
                  type="text"
                  placeholder="Change of name?"
                  className="input"
                  name="name"
                  onChange={profileChange}
                  value={profile.name.toLowerCase()}
                />
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <h3>Username</h3>
                <input
                  type="text"
                  placeholder="How should we call you then?"
                  className="input"
                  name="username"
                  onChange={profileChange}
                  value={profile.username.toLowerCase()}
                />
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <h3>Email</h3>
                <input
                  type="email"
                  placeholder="How should we contact you?"
                  className="input"
                  name="email"
                  onChange={profileChange}
                  value={profile.email}
                />
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <h3>Role</h3>
                <select
                  className="border-2 border-primary-borders dark:border-primary-borders-dark rounded-md bg-transparent outline-none p-1 text-sm placeholder:text-sm dark:text-gray-400 text-gray-800 font-medium"
                  name="role"
                  id="role"
                  value={profile.role.toLowerCase()}
                  onChange={profileChange}
                >
                  <option value="" disabled hidden>
                    Got a promotion?
                  </option>
                  {roles.map((role, key) => (
                    <option key={key} value={role._id} className="option">
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 mb-3">
                <h3>Profile Picture</h3>
                <input
                  type="file"
                  id="fileInput"
                  className="input cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {error && (
                <p className="!text-red-500 font-semibold text-center mb-2 capitalize">
                  {error}
                </p>
              )}

              <div className="flex justify-end items-center">
                <Button
                  children="Submit"
                  variant="default"
                  className="w-20"
                  submit
                  onClick={submitProfile}
                />
              </div>
            </form>

            <p className="font-semibold text-xs text-center capitalize italic mt-2">
              <span className="text-blue-500 ">Note:</span> for security reason
              must relogin first to see changes!
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">
          {/* CHANGE PASSWORD */}
          <div className="w-full h-[30rem] lg:row-span-3 profile-container">
            <div className="mb-5">
              <h1 className="leading-snug">Change Password</h1>
              <p>Here you can set your new password</p>
            </div>

            <form className="w-full">
              <div className="flex flex-col gap-3 mb-5">
                <h3>Current Password</h3>
                <input
                  type="text"
                  placeholder="Your old password"
                  className="input"
                  name="currentPassword"
                  onChange={passworHandledChange}
                  value={passwordChange.currentPassword}
                />
              </div>

              <div className="flex flex-col gap-3 mb-5">
                <h3>Password</h3>
                <input
                  type="password"
                  placeholder="Your new password"
                  className="input"
                  name="password"
                  onChange={passworHandledChange}
                  value={passwordChange.password}
                />
              </div>

              <div className="flex flex-col gap-3 mb-3">
                <h3>Confirm Password</h3>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="input"
                  name="confirmPassword"
                  onChange={passworHandledChange}
                  value={passwordChange.confirmPassword}
                />
              </div>

              {errorPassword && (
                <p className="!text-red-500 font-semibold text-center capitalize mb-2">
                  {errorPassword}
                </p>
              )}

              <div className="flex justify-end items-center">
                <Button
                  children="Submit"
                  variant="default"
                  className="w-20"
                  submit
                  onClick={submitPassword}
                />
              </div>
            </form>

            <p className="font-semibold text-xs text-center capitalize italic mt-2">
              <span className="text-blue-500 ">Note:</span> for security reason
              must relogin first to see changes!
            </p>
          </div>

          {/* DISPLAY IMAGE */}
          <div className="w-full h-[20rem] lg:hidden profile-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
