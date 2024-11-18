import { useState, useMemo } from "react";

// Create a custom hook for sorting data in tables
const useSort = (data, config = null) => {
  // State to store the sorting configuration
  const [sortConfig, setSortConfig] = useState(config);

  // Memoized sorted data to avoid unnecessary sorting on re-renders
  const sortedData = useMemo(() => {
    if (!sortConfig) {
      return data;
    }

    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (aValue > bValue) {
        return direction === "ascending" ? -1 : 1;
      }

      if (aValue < bValue) {
        return direction === "ascending" ? 1 : -1;
      }

      return 0;
    });
  }, [data, sortConfig]);

  // Function to request sorting on a specific key
  const requestSort = (key) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Return sorted data, requestSort function, and current sort configuration
  return { data: sortedData, requestSort, sortConfig };
};

export default useSort;
