import React from "react";
import "./styles.scss";
import { ReactComponent as SignIn } from "../../assets/box-arrow-in-right.svg";

export const NavBar = () => {
  return (
    <nav>
      <h1 href="/">COINTALK</h1>
      <div className="login-desktop">
        <a href="/login" className="sign-in">
          Sign In
        </a>
        <a href="/signup" className="sign-up">
          <h3>Sign Up</h3>
        </a>
      </div>
      <a href="/login" className="login-mobile">
        <SignIn />
      </a>
    </nav>
  );
};
