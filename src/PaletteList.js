import React from "react";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";

const styles = {
  root: {
    backgroundColor: "#434190",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "90%",
    maxWidth: "960px",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "30px"
  }
};

const PaletteList = ({ palettes, classes, history }) => {
  function goToPalette(id) {
    history.push(`palette/${id}`);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette
              key={palette.id}
              {...palette}
              handleClick={goToPalette}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
