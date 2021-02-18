import React from "react";
import "./styles.scss";

export const Button = ({ text, action }) => {
  return (
    <button onClick={action}>
      <h3>{text}</h3>
    </button>
  );
};
