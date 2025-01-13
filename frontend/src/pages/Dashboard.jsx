import {
  useGetClientCountQuery,
  useGetSalesTodayQuery,
  useGetStatusCountQuery,
  useGetStatusRevenueQuery,
} from "../api/analyticsApi/performanceApi";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineArrowCircleLeft,
  HiOutlineUsers,
} from "react-icons/hi";

import DashboardAnalytics from "../components/DashboardAnalytics";

const Dashboard = () => {
  const {
    data: count,
    isLoading: loadingCount,
    error: errorCount,
  } = useGetStatusCountQuery();
  const {
    data: revenue,
    isLoading: loadingRevenue,
    error: errorRevenue,
  } = useGetStatusRevenueQuery();
  const {
    data: latestSale,
    isLoading: loadingLatestSale,
    error: errorLatestSale,
  } = useGetSalesTodayQuery();
  const {
    data: client,
    isLoading: loadingClient,
    error: errorClient,
  } = useGetClientCountQuery();

  const icons = [
    { icons: <HiOutlineXCircle className="text-red-500 text-xl font-bold" /> },
    {
      icons: (
        <HiOutlineCheckCircle className="text-green-500 text-xl font-bold" />
      ),
    },
    { icons: <HiOutlineClock className="text-gray-500 text-xl font-bold" /> },
    {
      icons: (
        <HiOutlineArrowCircleLeft className="text-blue-500 text-xl font-bold" />
      ),
    },
  ];

  return (
    <div className="w-full h-full overflow-auto flex-1">
      <div className="w-full h-auto p-2 flex justify-center gap-5 xl:items-center xl:flex-col xl:gap-2">
        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-3 lg:grid-cols-1 w-full h-full gap-x-4 gap-y-5">
          {/* LEFT SIDE */}
          <div
            className="dark:bg-secondary-bg-dark bg-secondary-bg rounded-lg shadow-xl h-[10rem]
          flex flex-col justify-between py-3 px-5"
          >
            {revenue &&
              revenue.map((label, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-start"
                >
                  {/* Icon on the left */}
                  <div>{icons[index]?.icons}</div>
                  <p className="font-bold dark:text-secondary-txt-dark">
                    {label.status} Sales:
                  </p>
                  <p>₱{label.statusRevenue.toLocaleString()}</p>
                  {loadingRevenue && <p>Loading...</p>}
                  {errorRevenue && <p>{errorRevenue}</p>}
                </div>
              ))}
          </div>

          {/* MIDDLE */}
          <div
            className="dark:bg-secondary-bg-dark bg-secondary-bg rounded-lg shadow-xl h-[10rem]
          flex flex-col justify-between py-3 px-5"
          >
            {count &&
              count.map((label, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-start"
                >
                  {/* Icon on the left */}
                  <div>{icons[index]?.icons}</div>
                  <p className="font-bold dark:text-secondary-txt-dark">
                    {label.status} Sales:
                  </p>
                  <p>{label.countOfAllStatus}</p>
                  {loadingCount && <p>Loading...</p>}
                  {errorCount && <p>{errorCount}</p>}
                </div>
              ))}
          </div>

          {/* RIGHT */}
          <div
            className="dark:bg-secondary-bg-dark bg-secondary-bg rounded-lg shadow-xl h-[10rem]
          flex flex-col gap-2 py-3 px-5"
          >
            {!latestSale || latestSale.length === 0 ? (
              <p className="font-bold dark:text-secondary-txt-dark">
                No sales as of Today
              </p>
            ) : (
              latestSale.map((label, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-start"
                >
                  {/* Icon on the left */}
                  <HiOutlineCheckCircle className="text-green-500 text-xl font-bold" />
                  <p className="font-bold dark:text-secondary-txt-dark">
                    {label.dateToday} Sales:
                  </p>
                  <p>₱{label.totalSalesToday.toLocaleString()}</p>
                  {loadingLatestSale && <p>Loading...</p>}
                  {errorLatestSale && <p>{errorLatestSale}</p>}
                </div>
              ))
            )}

            {client &&
              client.map((label, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center justify-start"
                >
                  {/* Icon on the left */}
                  <HiOutlineUsers className="text-gray-500 text-xl font-bold" />
                  <p className="font-bold dark:text-secondary-txt-dark">
                    Number of Clients :
                  </p>
                  <p>{label.totalNumberOfClients}</p>
                  {loadingClient && <p>Loading...</p>}
                  {errorClient && <p>{errorClient}</p>}
                </div>
              ))}
          </div>

          <DashboardAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
