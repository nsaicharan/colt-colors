import React from "react";
import "./ColorBox.css";

function ColorBox({ background, name }) {
  return (
    <div className="ColorBox" style={{ background }}>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button">Copy</button>
      </div>

      <div className="see-more">More</div>
    </div>
  );
}

export default ColorBox;
