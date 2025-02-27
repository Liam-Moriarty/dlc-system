import { Outlet, useLocation } from "react-router-dom";
import { routeConfig } from "./topbar/TopbarTitles";

import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";

const RootLayout = () => {
  const { pathname } = useLocation();

  const { title, description } = routeConfig[pathname] || {
    // default if there's no pathname found in routeConfig
    title: "DLC Corporation",
    description: "Welcome to DLC!!",
  };

  return (
    <main className="w-full h-screen overflow-hidden gap-2 flex">
      <Sidebar />
      <div className="relative overflow-hidden w-full h-full flex flex-col xxl:pt-10 p-2">
        <Topbar title={title} description={description} />

        {/* Outlet is to render the child of the rootlayout */}
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;

// I import useLocation from react router dom to get the pathname
// the pathname allow us to get the current url example if I go to invoice
// the pathname value will be /accounting/invoice it will start after the domain name
// http://domainName/accounting/invoice then I have an object which have a key of
// those pathnames example /accounting/invoice, /accounting/orders etc.
// then I import that object and that is the routeConfig that's where the object stored
// I separate it so I can easily modify the url like adding, edit or deleting some urls
// then after importing I destructure the values of the keys, title and description
// then I map to each routeConfig if the pathname is same as the key in the routeConfig
// then I get the values of title and description and passed the value into the topbar
// component and show the values in their.
