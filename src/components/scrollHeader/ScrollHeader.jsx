import React from "react";
import "./styles.scss";

export const ScrollHeader = () => {
  return (
    <div id="scroll-header">
      <div className="content">
        <input type="text" placeholder="SEARCH" />
        <select name="sort">
          <option value="hot">Hot</option>
          <option value="new">New</option>
        </select>
      </div>
    </div>
  );
};
