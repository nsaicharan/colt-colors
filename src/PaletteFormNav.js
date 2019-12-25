import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    <div>
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
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PaletteFormNav;
