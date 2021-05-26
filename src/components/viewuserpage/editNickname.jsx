import React, { useState, useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const EditNickname = () => {
  const [click, setClick] = useState(false);
  const [style, setStyle] = useState(editButtonDefault);
  const [buttonStyle, setButtonStyle] = useState(faPencilAlt);
  const [disable, setDisable] = useState(true);

  const setIcon = (click, buttonStyle, style) => {
    setClick(click);
    setButtonStyle(buttonStyle);
    setStyle(style);
    setDisable(!disable);
  };

  return (
    <FontAwesomeIcon
      onClick={() =>
        click === false
          ? setIcon(true, faCheck, editButtonConfirm)
          : setIcon(false, faPencilAlt, editButtonDefault)
      }
      state={click}
      aria-label="edit"
      style={style}
      icon={buttonStyle}
    />
  );
};
