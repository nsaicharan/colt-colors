import React from "react";
import { Route, Switch } from "react-router-dom";
import NewPaletteForm from './NewPaletteForm'     
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  function findPalette(id) {
    return seedColors.find(palette => palette.id === id);
  }

  return (
    <Switch>
      <Route exact path="/palette/new" render={() => <NewPaletteForm />}/>
      <Route
        exact
        path="/"
        render={routerProps => (
          <PaletteList {...routerProps} palettes={seedColors} />
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
