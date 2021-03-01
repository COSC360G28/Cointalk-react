import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-left.svg";

export const ScrollHeader = () => {
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
          <select name="sort" dir="rtl">
            <option value="hot">HOT</option>
            <option value="new">NEW</option>
          </select>
          <Filter />
        </div>
      </div>
    </div>
  );
};
