import React from "react";
import "./Palette.css";
import ColorBox from "./ColorBox";

function Palette({ palette }) {
  const colorBoxes = palette.colors.map((color, i) => (
    <ColorBox background={color.color} name={color.name} key={i} />
  ));

  return (
    <div>
      <div className="Palette">
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    </div>
  );
}

export default Palette;
