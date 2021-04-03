import React from "react";
import "./styles.scss";
import { ReactComponent as SignIn } from "../../assets/box-arrow-in-right.svg";
import { Button } from "../button/Button";
import { AuthRequired } from "../authRequired/AuthRequired"

export const NavBar = () => {
  return (
    <>
      <AuthRequired reverse>
        <nav>
          <h1 href="/">COINTALK</h1>
            <div className="login-desktop">
              <a href="/login" className="sign-in">
                Sign In
              </a>
              <Button
                text="Sign Up"
                action={() => {
                  window.location.href = "/signup";
                }}
              />
            </div>
            <a href="/login" className="login-mobile">
              <SignIn />
            </a>
        </nav>
      </AuthRequired>
      <AuthRequired>
        <nav>
            <h1 href="/">COINTALK</h1>
              <div className="login-desktop">
                <a href="/logout" className="sign-in">
                  Logout
                </a>
              </div>
              <a href="/logout" className="login-mobile">
                <SignIn />
              </a>
          </nav>
      </AuthRequired>
    </>
  );
};
