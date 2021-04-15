import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Check } from "../../assets/check2.svg";
import axios from "axios";

export const EditCommentButton = ({ editGetter, editToggle }) => {

    const toggleButton = () => {
        editToggle();
    };

    //Query to see if the user has liked the post already

    return (
        <div className="edit-comment-button-container">
            {editGetter ? (
                <Check className="edit-comment-button-check" onClick={toggleButton} />
            ) : (
                <Pencil className="edit-comment-button-pencil" onClick={toggleButton} />
            )}
        </div>
    );
};
