import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Check } from "../../assets/check2.svg";
import axios from "axios";

export const EditPostButton = ({ editGetter, editToggle }) => {

    const toggleButton = () => {
        editToggle();
    };

    //Query to see if the user has liked the post already

    return (
        <div className="edit-post-button-container">
            {editGetter ? (
                <Check className="edit-post-button-check" onClick={toggleButton} />
            ) : (
                <Pencil className="edit-post-button-pencil" onClick={toggleButton} />
            )}
        </div>
    );
};
