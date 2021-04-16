import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";

export const PageFooter = ({ page, setPage, numPosts }) => {

  if(numPosts == 0 && page > 0) {
    setPage(page - 1);
  }

  return (
    <div className="page-footer">
      <div className="page-footer-content">
        {(page != 0) &&
          <LeftArrow className="page-footer-arrow" onClick={() => {setPage(page-1)}} />
        }
        <h3>Page {page+1}</h3>
        {(numPosts == 10) &&
          <RightArrow className="page-footer-arrow" onClick={() => {setPage(page+1)}} />
        }
      </div>
    </div>
  );
};
