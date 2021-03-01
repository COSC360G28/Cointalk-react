import React from "react";
import { ReactComponent as Ethereum } from "../../assets/ethereum.svg";
import { ReactComponent as Bitcoin } from "../../assets/bitcoin.svg";
import { ReactComponent as Ripple } from "../../assets/ripple.svg";
import { ReactComponent as Neo } from "../../assets/neo.svg";
import "./styles.scss";

export const CategorySelector = ({ selected, setSelected }) => {
  const categories = [
    { name: "ETH", icon: <Ethereum /> },
    { name: "BTC", icon: <Bitcoin /> },
    { name: "XRP", icon: <Ripple /> },
    { name: "NEO", icon: <Neo /> },
  ];

  return (
    <div id="category-selector">
      {categories.map((category) => (
        <div key={category.name} className="category-wrapper">
          <button
            disabled={selected === category.name}
            onClick={() => setSelected(category.name)}
            className={`category ${selected === category.name ? "selected" : ""
              }`}
          >
            {category.icon}
            <h2> {category.name}</h2>
          </button>
        </div>
      ))}
    </div>
  );
};
