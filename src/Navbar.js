import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SnackBar from "@material-ui/core/SnackBar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

function Navbar({ level, changeLevel, changeFormat }) {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  function handleFormatChange(e) {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  }

  function closeSnackBar() {
    setOpen(false);
  }

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="/">ui-colors</a>
      </div>

      <div className="slider-container">
        <span>Level: {level}</span>

        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
      </div>

      <div className="select-container">
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
        </Select>
      </div>

      <SnackBar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={1000}
        TransitionComponent={props => <Slide {...props} direction="up" />}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        onClose={closeSnackBar}
        action={[
          <IconButton
            onClick={closeSnackBar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </header>
  );
}

export default Navbar;
