import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { FaSearch } from "react-icons/fa";


export const GlobalFilter = ({ filter, setFilter }) => {


  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);


  return (
    <div className="global-search">
      <div className="search-inside">
      <FaSearch className="search-icon"/>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="search"
      />
      </div>
    </div>
  );
};
