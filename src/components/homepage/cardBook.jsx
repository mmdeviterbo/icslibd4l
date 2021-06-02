import React from "react";
import { Link } from "react-router-dom";

export default function CardBook({
    imageSrc,
    title,
    linkTo,
    setHoverText,
    year,
}) {
    return (
        <Link
            to={linkTo}
            className="cardContainer"
            style={cardContainer}
            onMouseEnter={() => setHoverText(title)}
            onMouseLeave={() => setHoverText("LATEST ACQUISITIONS")}
        >
            <div className="imgContainer" src={imageSrc} style={imgContainer}>
                <p
                    style={{
                        fontSize: "14px",
                        margin: "0",
                        textAlign: "center",
                        zIndex: 100,
                        position: "absolute",
                        bottom: 0,
                        background: "rgba(0,0,0,0.2)",
                    }}
                    className="bookTitleCard"
                >
                    {title}
                    <br />
                    {year.toString().split("-")[0] || " "}
                </p>
                <img
                    src={imageSrc}
                    style={imgSrcStyle}
                    alt="#"
                    draggable={false}
                />
            </div>
        </Link>
    );
}

const cardContainer = {
    width: "150px",
    color: "black",
    margin: "8px",
    transition: "0.3s",
    transform: "scale(1)",
};
const imgContainer = {
    height: "90%",
    position: "relative",
};
const imgSrcStyle = {
    height: "100%",
    width: "100%",
    boxShadow: "1px 1px 5px 1px black",
};
