import React, { useContext } from "react";
import "./styles.scss";
import { ReactComponent as SignIn } from "../../assets/box-arrow-in-right.svg";
import { Button } from "../button/Button";
import { ReactComponent as DefaultAvatar } from "../../assets/user.svg";
import { UserContext } from "../../Contexts.js";

export const NavBar = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <nav>
        <h1 href="/">COINTALK</h1>
        {user ? (
          user.accountavatarurl ? (
            <img
              alt="avatar"
              className="avatar"
              onClick={() => {
                window.location.replace("/logout");
              }}
              src={
                process.env.REACT_APP_API_URL +
                "/image/" +
                user.accountavatarurl
              }
            />
          ) : (
            <DefaultAvatar
              className="avatar"
              onClick={() => {
                window.location.replace("/logout");
              }}
            />
          )
        ) : (
          <>
            <div className="login-desktop">
              <a href="/login" className="sign-in">
                Log In
              </a>
              <Button
                action={() => {
                  window.location.replace("/signup");
                }}
                text="Sign Up"
              />
            </div>
            <a href="/login" className="login-mobile">
              <SignIn />
            </a>
          </>
        )}
      </nav>
    </>
  );
};
