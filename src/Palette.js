import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
      <div class="slider">
        <Slider
          defaultValue={level}
          min={100}
          max={900}
          step={100}
          onAfterChange={changeLevel}
        />
      </div>

      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
}

export default Palette;
