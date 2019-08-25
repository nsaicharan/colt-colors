import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import "./ColorBox.css";

function ColorBox({ background, name, moreUrl, showLink }) {
  const [copied, setCopied] = useState(false);

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  function changeCopyState() {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{ background }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background }}
        />

        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p className={isLightColor ? "dark-text" : ""}>{background}</p>
        </div>

        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? "light-text" : ""}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor ? "dark-text" : ""}`}>
            Copy
          </button>
        </div>

        {showLink && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <div className={`see-more ${isLightColor ? "dark-text" : ""}`}>
              More
            </div>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
