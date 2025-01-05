import React, { useEffect } from "react";
import { LuSunMedium, LuMoonStar } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

import Tooltips from "./Tooltip";

const ToggleTheme = () => {
  // this is to select specific reducer in the store
  const theme = useSelector((state) => state.theme.mode);
  // this is to dispatch actions from the slice
  const dispatch = useDispatch();

  // to re-render the theme every time we made changes
  useEffect(() => {
    // This line removes both the "light" and "dark" classes from the <html> element (referred to as document.documentElement).

    // It ensures that any previous theme class is removed before applying the new one, preventing the situation where both classes could accidentally be applied at the same time.

    document.documentElement.classList.remove("light", "dark");

    // After removing the previous theme classes, this line adds the current theme (either "light" or "dark") as a class to the <html> element.

    // This allows the entire application to be styled according to the selected theme, as Tailwind CSS will apply dark mode styles when the "dark" class is present and default (light mode) styles otherwise.

    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <button id="mode" onClick={handleThemeToggle} className="cursor-pointer">
        {theme === "light" ? (
          <LuMoonStar size={25} className="lg:h-5" />
        ) : (
          <LuSunMedium size={25} className="lg:h-5" />
        )}
      </button>

      <Tooltips anchorSelect="#mode" content="Theme" place="bottom" />
    </>
  );
};

export default ToggleTheme;
