import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");

  function changeFormat(val) {
    setFormat(val);
  }

  function gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  }

  const shades = gatherShades(props.palette, props.colorId);

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showLink={false}
    />
  ));

  return (
    <div className="Palette">
      <Navbar changeFormat={changeFormat} showingAllColors={false} />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="ColorBox go-back">
          <Link to={`/palette/${props.palette.id}`} className="back-button">
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter
        paletteName={props.palette.name}
        emoji={props.palette.emoji}
      />
    </div>
  );
}

export default SingleColorPalette;
