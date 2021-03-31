import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-left.svg";

export const ScrollHeader = ({ setSort }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div id="scroll-header">
      <div className="content">
        <div className="wrapper">
          <Search />
          <input type="text" placeholder="SEARCH" onChange={handleChange} />
        </div>
        <div className="wrapper">
          <select
            name="sort"
            dir="rtl"
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            <option value="new">NEW</option>
            <option value="hot">HOT</option>
          </select>
          <Filter />
        </div>
      </div>
    </div>
  );
};
