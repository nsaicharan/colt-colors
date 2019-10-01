import React, { useState } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    height: "90%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)"
  },
  goBack: {
    height: "100%",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    }
  }
};

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
    <div className={props.classes.Palette}>
      <Navbar changeFormat={changeFormat} showingAllColors={false} />
      <div className={props.classes.colors}>
        {colorBoxes}
        <div className={props.classes.goBack}>
          <Link to={`/palette/${props.palette.id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter
        paletteName={props.palette.name}
        emoji={props.palette.emoji}
      />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
