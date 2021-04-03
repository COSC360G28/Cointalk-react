import React, { useState, useRef } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import { ReactComponent as CameraIcon } from "../../assets/camera-fill.svg";
import axios, { AxiosError } from "axios";

export const SignUp = () => {
  //Sign up fields
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorField, setErrorField] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const form = useRef("");

  //handle change
  function handleProfilePictureUpload(event) {
    if (event.target.files[0] != null) {
      setProfilePictureURL(URL.createObjectURL(event.target.files[0]));
      setProfilePicture(event.target.files[0]);
    }
  }

  //Handle Errors recieved by sumbit ("Missing Username, Password too short...")
  function handleErrors(response) {
    try {
      setErrorField(response.response.data.field);
      setErrorMessage(response.response.data.message);
    } catch {
      console.error(response);
    }
    return response;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        email: email,
        password: password,
        username: username,
      },
    };
    if (password == secondPassword) {
      axios
        .post(`http://localhost:5000/signup`, requestOptions)
        .then((res) => {
          if (res.status == 201) {
            window.location.href = "http://localhost:3000/";
          }
        })
        .catch((err) => {
          handleErrors(err);
        });
    } else {
      setErrorField("secondPassword");
      setErrorMessage("Passwords do not match.");
    }
  }

  return (
    <>
      <UserAccessForm topLinkLabel="Sign In" topLinkHref="/login">
        <form
          /* action="http:localhost:5000/signup" */
          /* method="POST" */
          onSubmit={handleSubmit}
          ref={form}
        >
          <label htmlFor="profile-upload" className="custom-file-upload">
            {profilePictureURL ? (
              <img src={profilePictureURL} />
            ) : (
              <CameraIcon />
            )}
          </label>
          <input
            type="file"
            id="profile-upload"
            name="profile-image"
            onChange={handleProfilePictureUpload}
            accept="image/png, image/jpeg"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorField == "username" && (
            <p className="errorLabel">Username {errorMessage}</p>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorField == "email" && (
            <p className="errorLabel">Email {errorMessage}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorField == "password" && (
            <p className="errorLabel">Password {errorMessage}</p>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
          {errorField == "secondPassword" && (
            <p className="errorLabel">{errorMessage}</p>
          )}
          <Button text="Sign Up" />
        </form>
      </UserAccessForm>
    </>
  );
};
