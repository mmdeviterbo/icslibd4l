import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import searchBg from "../../assets/searchBg_4.png";
import ParallaxEffect from "./parallaxEffect";
import logo from "../../assets/mainlogo/icslibd4l.webp";
gsap.registerPlugin(ScrollTrigger);

export default function BrowsePart({ browseRef }) {
  const [isHoverTitle, setIsHoverTitle] = useState("BROWSE");

  useEffect(() => {
    animateScrollTrigger();
  }, []);

  return (
    <div
      className="browsePartContainer"
      style={browsePartContainer}
      ref={browseRef}
    >
      <img src={searchBg} style={searchBgStyle} alt="#" />
      <div style={colorBrowseContainer} className="colorBrowseContainer">
        <img src={logo} style={logoImgBg} alt="#" />
        <h1 style={titleOrientation}>
          <p className="isHoverTitle">{isHoverTitle}</p>
        </h1>
      </div>
      <div style={designBoxContainer} className="designBoxContainer">
        <ParallaxEffect />
      </div>

      <div style={browseBoxContainer} className="browseBoxContainer">
        <Link
          className="browseBox browseboxBooks"
          style={browseBox}
          // TOUCHED: search filter redirect to search page type=books search=all books
          // to="/browse-books"
          to="/search?type=book&search="
          draggable={false}
          onMouseEnter={() => setIsHoverTitle("BOOK")}
          onMouseLeave={() => setIsHoverTitle("BROWSE")}
        >
          <div style={imgContainer} className="imgBooksContainer">
            <img
              src="https://img.icons8.com/ios/64/000000/book-stack.png"
              alt="#"
              draggable={false}
              style={imgStyle}
              className="imgBooksBefore"
            />
            <img
              src="https://img.icons8.com/ios-filled/64/000000/book-stack.png"
              alt="#"
              draggable={false}
              style={imgStyleHover}
              className="imgBooksHover"
            />
          </div>
          <p style={titleSource}>Books</p>
        </Link>
        <Link
          className="browseBox browseboxTheses"
          style={browseBox}
          // to="/browse-theses"
          // TOUCHED: search filter redirect to search page type=books search=all books
          to="/search?type=thesis&search="
          draggable={false}
          onMouseEnter={() => setIsHoverTitle("THESIS")}
          onMouseLeave={() => setIsHoverTitle("BROWSE")}
        >
          <div style={imgContainer} className="imgThesesContainer">
            <img
              src="https://img.icons8.com/ios/64/000000/agreement.png"
              alt="#"
              draggable={false}
              style={imgStyle}
              className="imgThesesBefore"
            />
            <img
              src="https://img.icons8.com/ios-filled/64/000000/agreement.png"
              alt="#"
              draggable={false}
              style={imgStyleHover}
              className="imgThesesHover"
            />
          </div>
          <p style={titleSource}>Theses</p>
        </Link>
        <Link
          className="browseBox browseboxSP"
          style={browseBox}
          // to="/browse-special-problems"
          // TOUCHED: search filter redirect to search page type=books search=all books
          to="/search?type=sp&search="
          draggable={false}
          onMouseEnter={() => setIsHoverTitle("SP")}
          onMouseLeave={() => setIsHoverTitle("BROWSE")}
        >
          <div style={imgContainer} className="imgSPContainer">
            <img
              src="https://img.icons8.com/ios/50/000000/new-file.png"
              alt="#"
              draggable={false}
              style={imgStyle}
              className="imgSPBefore"
            />
            <img
              src="https://img.icons8.com/ios-filled/50/000000/new-file.png"
              alt="#"
              draggable={false}
              style={imgStyleHover}
              className="imgSPHover"
            />
          </div>
          <p style={titleSource}>Special Problems</p>
        </Link>
      </div>
    </div>
  );
}

const browsePartContainer = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  transition: "0.5s",
  justifyContent: "center",
  gap: "10px",
  alignItems: "center",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  UserSelect: "none",
};
const browseBoxContainer = {
  width: "45%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const colorBrowseContainer = {
  position: "absolute",
  height: "75%",
  width: "95%",
  background: "#0067A1",
  borderRadius: "7px",
  boxShadow: "2px 5px 8px 0 #36454f, -6px -6px 8px 0 rgba(255, 255, 255, 0.8)",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
};

const logoImgBg = {
  position: "absolute",
  height: "200%",
  width: "120%",
  objecFit: "cover",
  filter: "grayscale(0.8)",
  opacity: 0.4,
  zIndex: 0,
};

const titleOrientation = {
  overflow: "hidden",
  writingMode: "vertical-rl",
  textOrientation: "upright",
  color: "white",
  fontSize: "70px",
  fontWeight: 900,
  height: "100%",
  background: "rgba(0,0,0,0.9)",
  textAlign: "center",
  margin: 0,
  padding: "0 3%",
  marginLeft: "10%",
  zIndex: 1,
};

const designBoxContainer = {
  width: "50%",
};

const searchBgStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  zIndex: "-1",
  transform: "scaleY(-1)",
};

const browseBox = {
  borderRadius: "200px",
  height: "30vh",
  width: "30vh",
  cursor: "pointer",
  background: "#e0e0e0",
  boxShadow: "3px 3px 5px 0 #36454f, -3px -3px 5px 0 rgba(255, 255, 255, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "700",
  fontSize: "16px",
  transition: "0.5s",
  margin: "8px",
  tranform: "scale(1)",
};
const imgContainer = {
  position: "relative",
  height: "40%",
  width: "41%",
};

const imgStyle = {
  height: "95%",
  width: "95%",
  position: "absolute",
};
const imgStyleHover = {
  height: "100%",
  width: "100%",
  position: "absolute",
  display: "none",
};
const titleSource = {
  color: "black",
  padding: 0,
  margin: 0,
};

const animateScrollTrigger = () => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".colorBrowseContainer",
      scrub: 0.5,
      start: "top center",
      end: "bottom bottom",
    },
  });
  tl.from(".browseboxBooks", { xPercent: -80 });
  tl.from(".browseboxTheses", { xPercent: 80 });
  tl.from(".browseboxSP", { xPercent: -80 });

  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".colorBrowseContainer",
      scrub: 2,
      start: "top center",
      end: "bottom bottom",
    },
  });
  t2.from(".isHoverTitle", { yPercent: -80 });
};
