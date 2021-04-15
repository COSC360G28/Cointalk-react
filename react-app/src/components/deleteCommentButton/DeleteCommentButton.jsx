import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import axios from "axios";
import { Button } from "../button/Button";

export const DeleteCommentButton = ({ commentId }) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/comment/${commentId}/remove`, {}, { withCredentials: true })
            .then((res) => {
                window.location.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="delete-comment-button-container">
            <Trash className="delete-comment-button-trash" onClick={() => {setConfirmDelete(true)}} />
            {confirmDelete ?
                <div className="confirm-delete-overlay">
                    <div className="confirm-delete">
                        <p>Are you sure you want to delete this comment?</p>
                        <div id="confirm-delete-buttons">
                            <h2 onClick={() => {setConfirmDelete(false)}}>No</h2>
                            <Button text="Delete" action={handleDelete} />
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
};
