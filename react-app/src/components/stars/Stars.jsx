import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as StarSelected } from "../../assets/star-fill.svg";

export const Stars = ({ num }) => {
    const [selected, setSelected] = useState(true);

    const toggleStar = () => {
        setSelected(!selected);
    };

    return (
        <div className="star-container">
            {selected ? (
                <StarSelected className="star star-selected" onClick={toggleStar} />
            ) : (
                    <Star className="star" onClick={toggleStar} />
                )}
            <p className="num-stars">{selected ? num + 1 : num}</p>
        </div>
    );
};
