import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as Trash } from "../../assets/trash.svg";
import axios from "axios";
import { Button } from "../button/Button";

export const DeletePostButton = ({ postId }) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/post/${postId}/remove`, {}, { withCredentials: true })
            .then((res) => {
                window.location.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="delete-post-button-container">
            <Trash className="delete-post-button-trash" onClick={() => {setConfirmDelete(true)}} />
            {confirmDelete ?
                <div className="confirm-delete-overlay">
                    <div className="confirm-delete">
                        <p>Are you sure you want to delete this post?</p>
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
