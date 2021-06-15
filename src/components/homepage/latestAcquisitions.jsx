import React, { useState, useEffect } from "react";
import CardBook from "./cardBook";
import latestAcqBg from "../../assets/searchBg_4.png";
import { useHistory } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import PropagateLoader from "react-spinners/PropagateLoader";
import logo from "../../assets/mainlogo/icslibd4l.webp";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LatestAcquisitions({ latestAcqRef }) {
  const history = useHistory();
  const [hoverText, setHoverText] = useState("");
  const [acquisitions, setacquisitions] = useState([]);
  const [loader, setLoader] = useState(true);

  const imgNotAvailable =
    "https://samsinternational.com/wp-content/themes/sams/dist/images/rug-no-thumb.jpg";

  useEffect(() => {
    animateScrollTriggger();
    async function fetchData() {
      const booksInfo = await ResourceService.getLatestBooks();
      for (var book of booksInfo.data) {
        book.bookCoverLink = `https://drive.google.com/uc?export=view&id=${book.bookCoverLink
          .replace("https://drive.google.com/uc?id=", "")
          .replace("https://drive.google.com/file/d/", "")
          .replace("/view?usp=sharing","")
          .replace("/view", "")}`;
      }
      setacquisitions(booksInfo.data);
      setLoader(false); //hide loader animation
    }
    fetchData();
  }, []);

  const handleViewAllBooks = () => {
    history.push("/browse-books");
  };

  useEffect(() => {
    acquisitions.sort((a, b) =>
      a.year < b.year ? 1 : b.year < a.year ? -1 : 0
    );
  }, [acquisitions]);

  return (
    <div
      className="latestAcquisitions"
      style={latestAcquisitionsContainer}
      ref={latestAcqRef}
    >
      <img src={latestAcqBg} style={latestAcqBgStyle} alt="#" />
      <div style={colorsParent} className="latestAcqcolorsParent">
        <div style={whiteBg}>
          <span style={hoverTextStyleWhite}>{hoverText}</span>
          <div
            style={loader ? displayLoader : acquisitionsInnerContainer}
            className="acquisitionsInnerContainer"
          >
            {loader ? (
              <PropagateLoader
                color={"#0067a1"}
                speedMultiplier={2}
                loading={loader}
                size={20}
              />
            ) : (
              acquisitions.map((book) => (
                <CardBook
                  className="cardContainer"
                  imageSrc={book.bookCoverLink || imgNotAvailable}
                  title={book.title || "No title"}
                  key={book.title}
                  linkTo={`/book/${book.bookId}`}
                  year={book.dateAcquired || book.Published || "No date"}
                  setHoverText={setHoverText}
                  book={book}
                />
              ))
            )}
          </div>
        </div>
        <div style={blueBg}>
          <img src={logo} style={logoStyle} alt="#" />
          <span style={hoverTextStyle}>{hoverText}</span>
          <div style={textBgContainer}>
            <h3 style={textBg} className="latestAcqhoverTextStyle">
              LATEST
              <br />
              ACQUISITIONS
            </h3>
            <p
              style={{
                fontSize: "calc(10px + 0.5vw)",
                textAlign: "center",
                marginTop: "3%",
              }}
              className="latestAcqDiscover"
            >
              Discover and browse the latest books
            </p>
          </div>
          <div style={buttonViewAllBooks}>
            <button
              type="button"
              className="btnViewAll"
              onClick={handleViewAllBooks}
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const latestAcquisitionsContainer = {
  position: "relative",
  height: "95vh",
  background: "white",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  filter: "brightness(1)",
  transition: "0.8s",
  // protect from copy paste
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  UserSelect: "none",
};
const acquisitionsInnerContainer = {
  minHeight: "auto",
  maxHeight: "100%",
  display: "grid",
  justifyContent: "space-around",
  gridTemplateColumns: "auto auto",
  overflow: "auto auto",
  transition: "0.8s",
};
const displayLoader = {
  display: "grid",
  placeItems: "center",
  height: "100%",
};

const latestAcqBgStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  zIndex: -1,
};

const colorsParent = {
  position: "relative",
  height: "85%",
  width: "95%",
  zIndex: 0,
  display: "flex",
  borderRadius: "7px",
  overflow: "hidden",
  //   boxShadow: "4px 4px 20px #36454f",
  boxShadow: "2px 5px 10px 0 #4a5c69, -6px -6px 8px 0 rgba(255, 255, 255, 0.8)",
};

const whiteBg = {
  height: "100%",
  width: "60%",
  background: "rgba(255,255,255)",
  zIndex: 1,
  padding: "0.5% 0",
};
const blueBg = {
  position: "relative",
  background: "#0067A1",
  height: "100%",
  width: "40%",
  zIndex: 1,
  overflow: "hidden",
  boxShadow:
    "2px 4px 6px 0 rgba(0, 0, 0, 0.8), -6px -6px 4px 0 rgba(255, 255, 255, 0.8)",
  display: "flex",
  flexDirection: "column",
};

const logoStyle = {
  position: "absolute",
  height: "200%",
  filter: "grayscale(0.8)",
  opacity: 0.4,
};

const textBgContainer = {
  flexGrow: 1,
  width: "100%",
  height: "100%",
  background: "#0067A110",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  wordBreak: "break-all",
};
const textBg = {
  margin: 0,
  fontSize: "calc(24px + 2vw)",
  background: "rgba(0,0,0,0.85)",
  color: "white",
  fontWeight: 500,
  width: "100%",
  textAlign: "center",
  padding: "15px",
};

const hoverTextStyle = {
  position: "absolute",
  fontSize: "250px",
  fontWeight: 900,
  lineHeight: "1",
  color: "rgba(10,10,10,0.04)",
};

const hoverTextStyleWhite = {
  ...hoverTextStyle,
  fontSize: "150px",
  textAlign: "center",
  writingMode: "vertical-lr",
  textOrientation: "upright",
};

const buttonViewAllBooks = {
  height: "50%",
  flexGrow: 0.4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 10000,
};

const animateScrollTriggger = () => {
  gsap.from(".latestAcqhoverTextStyle", {
    scrollTrigger: {
      trigger: ".latestAcqcolorsParent",
      scrub: 1,
      start: "top center",
      end: "bottom bottom",
    },
    yPercent: -180,
    duration: 1.5,
    scale: 1.5,
  });
};

// mobile responsiveness is in homepagestyle.css
