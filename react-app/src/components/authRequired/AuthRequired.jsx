import React, { useEffect, useState } from "react";

import axios from "axios";

//Wrap around components that the user needs to be logged in to see
//Use reverse for components that can only be viewed when NOT logged in
//See navbar component for example
export const AuthRequired = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  });

  function checkAuthStatus() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/check-auth-status`,
        { empty: "empty" },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.loggedIn == "loggedIn") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //props.reverse XOR loggedIn
  // if (props.reverse ^ loggedIn) {
  return props.children;
  // } else {
  //   return null;
  // }
};
