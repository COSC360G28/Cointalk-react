import React from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";

export const Login = () => {
  return (
    <UserAccessForm topLinkLabel="Sign Up" topLinkHref="/signup">
      <form action="">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <Button text="Sign In" />
      </form>
    </UserAccessForm>
  );
};
