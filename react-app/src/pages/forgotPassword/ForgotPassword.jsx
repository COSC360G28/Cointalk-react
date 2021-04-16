import React, { useState, useContext } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgot-password`, {email: email})
      .then((res) => {
        setMessage("If this email is associated with an account, a recovery email has been sent.");
      })
      .catch((err) => {
        setMessage("The server was unable to send the recovery email.");
        console.log(err);
      });
  }

  return (
    <UserAccessForm topLinkLabel="Login" topLinkHref="/login">
      <form onSubmit={handleSubmit}>
        <p>Input the email associated with your account and we will send a recovery email.</p>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="Send" />
        {message && <p className="forgot-password-message">{message}</p>}
      </form>
    </UserAccessForm>
  );
};
