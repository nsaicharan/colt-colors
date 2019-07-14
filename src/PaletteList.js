import React from "react";
import { Link } from "react-router-dom";

const PaletteList = ({ palettes }) => {
  return (
    <div>
      <h1>React Colors</h1>
      <ul>
        {palettes.map(palette => (
          <li key={palette.id}>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaletteList;
