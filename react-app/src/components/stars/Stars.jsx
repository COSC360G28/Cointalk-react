import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as StarSelected } from "../../assets/star-fill.svg";
import axios from "axios";

export const Stars = ({ score, postId }) => {
    const [selected, setSelected] = useState(true);
    const [likeCount, setLikeCount] = useState(score);

    const toggleStar = () => {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/like`,
                { pid: postId },
                { withCredentials: true }
            )
            .then((res) => {
                setSelected(res.data.isLiked);
                axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/post-like-count`,
                        { pid: postId },
                        { withCredentials: true }
                    )
                    .then((res) => {
                        setLikeCount(res.data.numberOfLikes);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });

    };

    //Query to see if the user has liked the post already

    useEffect(() => {
        checkLiked();
    }, []);

    function checkLiked() {
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/check-post-like`,
                { pid: postId },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.liked == "postedLiked") {
                    setSelected(true);
                } else {
                    setSelected(false);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="star-container">
            {selected ? (
                <StarSelected className="star star-selected" onClick={toggleStar} />
            ) : (
                <Star className="star" onClick={toggleStar} />
            )}
            <p className="num-stars">{likeCount}</p>
        </div>
    );
};
