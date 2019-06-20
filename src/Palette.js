import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from './Navbar';
import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);

  function changeLevel(newLevel) {
    setLevel(newLevel);
  }

  const colorBoxes = palette.colors[level].map((color, i) => (
    <ColorBox background={color.hex} name={color.name} key={i} />
  ));

  return (
    <div className="Palette">
      <Navbar level={level} changeLevel={changeLevel} />

      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}

export default Palette;
