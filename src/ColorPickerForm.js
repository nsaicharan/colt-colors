import React, { useState } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function ColorPickerForm({ colors, paletteIsFull, addNewColor }) {
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
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          onChange={handleColorNameChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name.",
            "Color name must be unique.",
            "Color already used!"
          ]}
        />
        <Button
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

export default ColorPickerForm;
