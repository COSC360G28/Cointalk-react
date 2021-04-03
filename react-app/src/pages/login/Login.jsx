import React, { useState } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import axios from "axios";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      .post(`http://localhost:5000/login`, requestOptions, {withCredentials: true})
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        if(err.response.status == 401) {
          setError("Incorrect Email or Password.");
        } else {
          console.log(err);
        }
      });
  }

  return (
    <UserAccessForm topLinkLabel="Sign Up" topLinkHref="/signup">
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="errorLabel">{error}</p>}
        <Button text="Sign In" />
      </form>
    </UserAccessForm>
  );
};
