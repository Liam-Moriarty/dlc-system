import { useState } from "react";

// create a custom hook for sorting data in tables
// this hooks accepts data as an argument
const useSort = (data, config = null) => {
  // this state will store the key and direction of the config with a default values of null
  const [sortConfig, setSortConfig] = useState(config);

  // Utility function to clean formatted numbers or digits
  const parseFormattedNumbers = (digit) => {
    return Number(digit.replace(/,/g, "")); // remove comas and convert to numbers
  };

  // get the copy of the data and stored it in sortedData variable
  // then sort the copied data
  const sortedData = [...data].sort((a, b) => {
    // if sortConfig is not null or not empty run the condition
    if (sortConfig !== null) {
      const { key, direction } = sortConfig; // destructure the key and direction that is in the config

      let aValue = a[key];
      let bValue = b[key];

      if (key === "price") {
        aValue = parseFormattedNumbers(aValue);
        bValue = parseFormattedNumbers(bValue);
      }

      if (aValue > bValue) {
        // if the condition is true return another conditon where if direction is = ascending return -1
        return direction === "ascending" ? -1 : 1; // means a comes before b this is ascending a, b, c ...
      }

      if (aValue < bValue) {
        // if this condition is true return another conditon where if direction is = ascending return -1
        return direction === "ascending" ? 1 : -1; // means b comes before a this is descending z, x, y ...
      }
    }

    return 0; // if none of the condition is true return 0 or means the data is equal
  });

  // function when specific table click
  // request a key to which column will be sorted
  const requestSort = (key) => {
    // this assume the default value is ascending
    let direction = "ascending";

    // this 3 conditions must be met to change to descending
    if (
      sortConfig && // if you have sortConfig
      sortConfig.key === key && // if the sortConfig key is equal to the key of the column
      sortConfig.direction === "ascending" // if the direction = ascending
    ) {
      // if all conditions are met change the direction to descending
      direction = "descending";
    }

    // then updates the key and direction of the sortConfig function
    setSortConfig({ key, direction });
  };

  // this returns the sorted data the requestSort function and the sortConfig key and direction
  return { data: sortedData, requestSort, sortConfig };
};

export default useSort;
