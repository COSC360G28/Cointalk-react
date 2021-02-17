import React from "react";
import "./styles.scss";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-left.svg";

export const ScrollHeader = () => {
  return (
    <div id="scroll-header">
      <div className="content">
        <div className="wrapper">
          <Search />
          <input type="text" placeholder="SEARCH" />
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
