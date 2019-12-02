import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from './styles/PaletteStyles'
import { withStyles } from "@material-ui/styles";

function Palette({ palette, classes }) {
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
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showingAllColors={true}
      />

      <div className={classes.colors}>{colorBoxes}</div>

      <PaletteFooter paletteName={palette.name} emoji={palette.emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);
