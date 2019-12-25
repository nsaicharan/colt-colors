import React, { useState } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "0.8rem",
    margin: "1rem 0",
    fontSize: "1.5rem"
  },
  colorNameInput: {
    width: "100%"
  }
};

function ColorPickerForm({ colors, paletteIsFull, addNewColor, classes }) {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleColorNameChange = e => {
    setNewColorName(e.target.value);
  };

  const handleSubmit = () => {
    addNewColor(currentColor, newColorName);
    setNewColorName("");
  };

  // Custom Validation Rules
  ValidatorForm.addValidationRule("isColorNameUnique", value =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );
  ValidatorForm.addValidationRule("isColorUnique", value =>
    colors.every(({ color }) => color !== currentColor)
  );

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          variant="filled"
          margin="normal"
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name.",
            "Color name must be unique.",
            "Color already used!"
          ]}
        />
        <Button
          className={classes.addColor}
          variant="contained"
          color="primary"
          style={{ backgroundColor: currentColor }}
          disabled={paletteIsFull}
          type="submit"
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
