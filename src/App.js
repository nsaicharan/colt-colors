import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  function findPalette(id) {
    return palettes.find(palette => palette.id === id);
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routerProps => (
          <NewPaletteForm
            {...routerProps}
            savePalette={savePalette}
            palettes={palettes}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routerProps => (
          <PaletteList {...routerProps} palettes={palettes} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routerProps => (
          <Palette
            palette={generatePalette(findPalette(routerProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routerProps => (
          <SingleColorPalette
            palette={generatePalette(
              findPalette(routerProps.match.params.paletteId)
            )}
            colorId={routerProps.match.params.colorId}
          />
        )}
      />
    </Switch>
  );
}

export default App;
