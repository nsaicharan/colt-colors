import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 400;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {}
});

function PaletteFormNav({
  palettes,
  classes,
  open,
  handleSubmit,
  handleDrawerOpen
}) {
  const [newPaletteName, setNewPaletteName] = useState("");

  const handlePaletteNameChange = e => {
    setNewPaletteName(e.target.value);
  };

  ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
    palettes.every(({ paletteName }) => paletteName !== newPaletteName)
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>

        <div className={classes.navBtns}>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              value={newPaletteName}
              name="newPaletteName"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter Palette Name",
                "Palette Name Already Exits!"
              ]}
              onChange={handlePaletteNameChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
