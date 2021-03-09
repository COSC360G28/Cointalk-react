import React from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";

export const UserAccessForm = (props) => {
  return (
    <div className="user-access-content">
      <div className="user-access-form">
        <a href="/">
          <h1>COINTALK</h1>
        </a>
        <form>
          {props.children}
        </form>
      </div>
      <a href={props.topLinkHref} class="top-right-link">{props.topLinkLabel}</a>
    </div>
  );
};
