import React, { useState } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import { ReactComponent as CameraIcon } from "../../assets/camera-fill.svg";

export const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState();

  function handleProfilePictureUpload(event) {
    if (event.target.files[0] != null) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <>
      <UserAccessForm topLinkLabel="Sign In" topLinkHref="/login">
        <label htmlFor="profile-upload" className="custom-file-upload">
          {profilePicture ? <img src={profilePicture} /> : <CameraIcon />}
        </label>
        <input
          type="file"
          id="profile-upload"
          name="filename"
          onChange={handleProfilePictureUpload}
          accept="image/png, image/jpeg"
        />
        <input type="text" name="username" placeholder="Username" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <Button text="Sign In" />
      </UserAccessForm>
    </>
  );
};
