import ToggleTheme from "../../components/ToggleTheme";

const Topbar = ({ title, description }) => {
  const username = window.localStorage.getItem("username");
  const profilePic = window.localStorage.getItem("profile");

  return (
    <div className="sticky z-50 w-full h-[5rem] md:h-[3rem] flex items-center justify-between p-3 mb-2 sm:mb-4 dark:bg-secondary-bg-dark bg-secondary-bg rounded-xl mt-3">
      {/* Left Side */}
      <div className="w-full sm:w-0">
        <h1 className="font-semibold lg:text-sm">{title}</h1>
        <p className="text-secondary-txt dark:text-secondary-txt-dark font-medium capitalize lg:text-xs md:hidden">
          {description}
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full flex justify-end items-center gap-4 py-2 px-4 lg:flex-col-reverse lg:items-end lg:gap-1 lg:py-0 lg:px-0">
        {/* Icons */}
        <div className="flex justify-evenly items-center gap-3 sm:gap-1">
          {username && (
            <p className="font-medium dark:text-secondary-txt-dark text-secondary-txt text-base sm:text-xs whitespace-pre">
              Welcome back {username}
            </p>
          )}

          <ToggleTheme />

          <img
            src={profilePic}
            alt="profile picture"
            className="w-8 h-8 object-cover rounded-full sm:w-6 sm:h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
