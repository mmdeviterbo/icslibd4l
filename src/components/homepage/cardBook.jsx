import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CardBook({
  imageSrc,
  title,
  linkTo,
  setHoverText,
  year,
  book,
}) {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const imgNotAvailable =
    "https://samsinternational.com/wp-content/themes/sams/dist/images/rug-no-thumb.jpg";

  return (
    <Link
      to={{ pathname: linkTo, state: { resourceData: book } }}
      className="cardContainer"
      style={cardContainer}
      onMouseEnter={() => setHoverText(title)}
      onMouseLeave={() => setHoverText("LATEST ACQUISITIONS")}
    >
      <div className="imgContainer" src={imageSrc} style={imgContainer}>
        <img
          src={(isLoadingImg && imgNotAvailable) || imageSrc}
          style={imgSrcStyle}
          alt="#"
          draggable={false}
          onLoad={() => setIsLoadingImg(false)}
        />
        <p
          style={{
            fontSize: "14px",
            margin: "0",
            textAlign: "center",
            zIndex: 100,
            position: "absolute",
            bottom: 0,
            background: "rgba(0,0,0,0.9)",
            color: "white",
            width: "98%",
            padding: "2px",
          }}
          className="bookTitleCard"
        >
          {title}
          <br />
          {year.toString().split("-")[0] || " "}
        </p>
      </div>
    </Link>
  );
}

const cardContainer = {
  width: "200px",
  color: "black",
  margin: "12px",
  transition: "0.3s",
  transform: "scale(1)",
};
const imgContainer = {
  height: "100%",
  position: "relative",
  padding: "2px",
};
const imgSrcStyle = {
  height: "100%",
  width: "100%",
  boxShadow: "1px 1px 5px 1px #36454f",
};
