import React, { useContext } from "react";
import "./styles.scss";
import { ReactComponent as SignIn } from "../../assets/box-arrow-in-right.svg";
import { Button } from "../button/Button";
import { ReactComponent as DefaultAvatar } from "../../assets/user.svg";
import { AuthRequired } from "../authRequired/AuthRequired";
import { UserContext } from "../../Contexts.js";

export const NavBar = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      <nav>
        <h1 href="/">COINTALK</h1>
        {user ? (
          user.accountAvatarURL ? (
            <img
              alt="avatar"
              className="avatar"
              onClick={() => {
                window.location.replace("/logout");
              }}
              src={user.accountAvatarURL}
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
                Sign up
              </a>
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
