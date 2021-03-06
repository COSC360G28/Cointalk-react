import React, { useState } from "react";
import "./styles.scss";
import { Button } from "../../components/button/Button";
import { UserAccessForm } from "../../components/userAccessForm/UserAccessForm";
import cameraIcon from "../../assets/iconCameraProfilePictureUpload.webp"


export const SignUp = () => {

  const [profilePicture, setProfilePicture] = useState(cameraIcon);

  function handleProfilePictureUpload(event) {
    if(event.target.files[0] != null) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <UserAccessForm>
      <label for="profile-upload" class="custom-file-upload" >
        <img src={profilePicture} />
      </label>
      <input type="file" id="profile-upload" name="filename" onChange={handleProfilePictureUpload} accept="image/png, image/jpeg" />
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="password" placeholder="Password" />
      <input type="text" name="confirmPassword" placeholder="Confirm Password" />
      <Button text="Sign In" />
    </UserAccessForm>
  );
};
