import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";

const styles = {
  ColorBox: {
    position: "relative",
    cursor: "pointer",
    "&:hover button": {
      opacity: 1
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },
  copyButton: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "#333" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    textDecoration: "none",
    opacity: 0,
    transition: "opacity 0.4s"
  },
  copyText: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "#333" : "white"
  },
  colorName: {
    color: props =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "#333"
  },
  seeMore: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? "#333" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
  },
  copyOverlay: {
    opacity: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out"
  },
  showOverlay: {
    opacity: 1,
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute"
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase"
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100"
    }
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s"
  }
};

function ColorBox({ background, name, moreUrl, showLink, classes }) {
  const [copied, setCopied] = useState(false);

  function changeCopyState() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className={classes.ColorBox} style={{ background }}>
        <div
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          style={{ background }}
        />

        <div
          className={`${classes.copyMessage} ${copied && classes.showMessage}`}
        >
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>

        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>

        {showLink && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <div className={classes.seeMore}>More</div>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
