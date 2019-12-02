import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles/ColorBoxStyles";
import { withStyles } from "@material-ui/styles";

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
