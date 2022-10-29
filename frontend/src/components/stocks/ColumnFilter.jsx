import React from "react";

const ColumnFilter = ({ column }) => {
    const {filterValue, setFilter} = column

  return (
    <span>
      Search:{" "}
      <input
        className="drop-shadow-xl"
        value={filterValue || " "}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default ColumnFilter;
