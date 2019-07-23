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
    <ColorBox
      background={color[format]}
      name={color.name}
      moreUrl={`/palette/${palette.id}/${color.id}`}
      key={color.id}
      showLink={true}
    />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
      />

      <div className="Palette-colors">{colorBoxes}</div>

      <footer className="Palette-footer">
        {palette.name}
        <span className="emoji">{palette.emoji}</span>
      </footer>
    </div>
  );
}

export default Palette;
