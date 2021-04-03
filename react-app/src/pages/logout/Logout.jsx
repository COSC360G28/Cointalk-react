import React, { useEffect, useState } from "react";

import axios from "axios";

//Wrap around components that the user needs to be logged in to see
//Use reverse for components that can only be viewed when NOT logged in
//See navbar component for example
export const Logout = () => {

    useEffect(() => {
        logout();
    });

    function logout() {
        axios
        .post(`http://localhost:5000/logout`, {"empty" : "empty"}, {withCredentials: true})
        .then((res) => {
            window.location.replace("/");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return(<>   </>);
};