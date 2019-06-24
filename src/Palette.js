import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  function changeLevel(newLevel) {
    setLevel(newLevel);
  }

  function changeFormat(val) {
    setFormat(val);
  }

  const colorBoxes = palette.colors[level].map((color, i) => (
    <ColorBox background={color[format]} name={color.name} key={i} />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
      />

      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}

export default Palette;
