import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-left.svg";

export const ScrollHeader = ({ setSort, setSearching }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const onSubmit = () => {
    setSearching(searchText);
  };

  return (
    <div id="scroll-header">
      <div className="content">
        <div className="wrapper">
          <Search onClick={onSubmit} />
          <input
            type="text"
            placeholder="SEARCH"
            onChange={handleChange}
            value={searchText}
            onKeyDown={(e) => {
              if (e.nativeEvent.key === "Enter") {
                onSubmit();
              }
            }}
          />
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
