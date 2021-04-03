import React, { useState } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import axios from "axios";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { 
        email: email,
        password: password,
      }
    };
    axios
      .post(`http://localhost:5000/login`, requestOptions)
      .then((res) => {
        alert("TODO: Add provider or someway of tracking user auth status.");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <UserAccessForm topLinkLabel="Sign Up" topLinkHref="/signup">
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button text="Sign In" />
      </form>
    </UserAccessForm>
  );
};
