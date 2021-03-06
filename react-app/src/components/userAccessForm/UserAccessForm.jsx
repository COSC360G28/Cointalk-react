import React from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";

export const UserAccessForm = ({ children }) => {
  return (
    <div className="user-access-content">
      <div className="user-access-form">
        <a href="/">
          <h1>COINTALK</h1>
        </a>
        <form>
          {children}
        </form>
      </div>
    </div>
  );
};
