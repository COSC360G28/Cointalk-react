import React from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";

export const Login = () => {
  return (
    <UserAccessForm>
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="password" placeholder="Password" />
      <Button text="Sign In" />
    </UserAccessForm>
  );
};
