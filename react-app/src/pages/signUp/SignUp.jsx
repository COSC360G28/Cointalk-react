import React, { useState, useRef } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import { ReactComponent as CameraIcon } from "../../assets/camera-fill.svg";

export const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState();
  const form = useRef(null);

  function handleProfilePictureUpload(event) {
    if (event.target.files[0] != null) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  }

  function submit() {
    form.submit();
  }

  return (
    <>
      <UserAccessForm topLinkLabel="Sign In" topLinkHref="/login">
        <form
          method="post"
          action="http://localhost:5000/signup"
          encType="multipart/form-data"
          ref={form}
        >
          <label htmlFor="profile-upload" className="custom-file-upload">
            {profilePicture ? <img src={profilePicture} /> : <CameraIcon />}
          </label>
          <input
            type="file"
            id="profile-upload"
            name="profile-image"
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
          <Button text="Sign Up" action={submit} />
        </form>
      </UserAccessForm>
    </>
  );
};
