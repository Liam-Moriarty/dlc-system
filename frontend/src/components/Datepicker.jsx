import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { FiSend } from "react-icons/fi";

const Datepicker = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("Select Date Range");
  const [selectedStartDate, setStartDate] = useState(null);
  const [selectedEndDate, setEndDate] = useState(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (selectedStartDate && selectedEndDate) {
      const startDate = formatDate(selectedStartDate);
      const endDate = formatDate(selectedEndDate);

      onSubmit({ startDate, endDate });
    } else {
      setSelectedDate("No Date Selected");
    }
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setSelectedDate(
        <span className="font-normal dark:text-primary-txt-dark text-primary-txt">
          {`${selectedStartDate.toDateString()} - ${selectedEndDate.toDateString()}`}
        </span>
      );
    } else if (selectedStartDate) {
      <p>{setSelectedDate(`${selectedStartDate.toDateString()}`)}</p>;
    } else {
      setSelectedDate("Select Date Range");
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="w-full h-20 mb-5 flex items-end flex-col py-2 px-36 lg:py-1 lg:px-2 lg:items-center">
      <div className="flex gap-2">
        <DatePicker
          selected={selectedStartDate}
          onChange={onChange}
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          dateFormat="yyyy/MM/dd"
          shouldCloseOnSelect={false}
          selectsRange
          strictParsing
          placeholderText="Select Date"
          showYearDropdown
          scrollableMonthYearDropdown
          className="datepicker"
          calendarClassName="dark:bg-secondary-bg-dark bg-secondary-bg 
        dark:border-primary-borders-dark border-primary-borders"
        />
        <Button
          icon={<FiSend size={15} />}
          variant="default"
          submit
          onClick={handleSubmit}
        />
      </div>

      <p className="flex font-semibold capitalize whitespace-pre text-center text-secondary-txt dark:text-secondary-txt-dark mt-2">
        Daily Sales of :{" "}
        <span className="font-normal dark:text-primary-txt-dark text-primary-txt">
          {selectedDate}
        </span>
      </p>
    </div>
  );
};

export default Datepicker;
