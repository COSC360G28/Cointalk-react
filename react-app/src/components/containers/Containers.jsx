import React from "react";
import "./styles.scss";

export const MainContent = ({ children }) => (
  <div className="main-content-container">{children}</div>
);

export const Content = ({ children }) => (
  <div className="content-container">{children}</div>
);
