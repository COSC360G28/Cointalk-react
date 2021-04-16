import React, { useState, useContext } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        username: username,
        password: password,
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, requestOptions, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setError("Incorrect Email or Password.");
        } else if(err.response.status == 403) {
          setError("Account has been banned.");
        } else {
          console.log(err);
        }
      });
  }

  return (
    <UserAccessForm topLinkLabel="Sign Up" topLinkHref="/signup">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="errorLabel">{error}</p>}
        <Button text="Sign In" />
      </form>
      <a href="/forgot-password" id="text-forgot-password">Forgot Password</a>
    </UserAccessForm>
  );
};
