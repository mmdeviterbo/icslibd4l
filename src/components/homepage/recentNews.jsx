import React, { useState, useEffect } from "react";
import recentNewsBg from "../../assets/searchBg_4.png";
import NewsService from "../../services/resourceService";
import PropagateLoader from "react-spinners/PropagateLoader";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function RecentNews({ appRef, newsRef }) {
  const [titleNews, setTitleNews] = useState([]);
  const [dateNews, setDateNews] = useState([]);
  const [imgNews, setImgNews] = useState([]);
  const [linkNews, setLinkNews] = useState([]);
  const [loader, setLoader] = useState(true);

  const scrollToTop = () =>
    appRef.current &&
    appRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  const getNewsData = async () => {
    setLoader(true);
    let { data } = await NewsService.getNews();
    setTitleNews(data.newsTitle);
    setDateNews(data.newsDate);
    setImgNews(data.newsImg);
    setLinkNews(data.newsLinks);
    setLoader(false);
  };

  useEffect(() => {
    animateScrollTriggger();
    getNewsData();
    return () => {
      setTitleNews([]);
      setDateNews([]);
      setImgNews([]);
      setLinkNews([]);
    };
  }, []);

  return (
    <div
      className="recentNewsContainer"
      style={recentNewsContainer}
      ref={newsRef}
    >
      <img src={recentNewsBg} style={recentNewsBgStyle} alt="#" />
      <div style={titleContentContainer}>
        <p style={newsStyle}>
          <span className="UPLBNewsClass" style={{ overflow: "hidden" }}>
            UPLB NEWS
          </span>
        </p>
        <div
          className="ui three stackable cards"
          style={loader ? displayLoader : recentNewsInnerContainer}
        >
          {loader ? (
            <PropagateLoader
              color={"#0067a1"}
              speedMultiplier={2}
              loading={loader}
              size={20}
            />
          ) : (
            titleNews.map((title, index) => (
              <ArticleContainer
                title={title}
                link={linkNews[index]}
                imgSrc={imgNews[index]}
                date={dateNews[index]}
                key={index}
                className="recentNewsTitle"
              />
            ))
          )}
        </div>
      </div>
      <div style={scrollToTopStyle}>
        <i
          style={arrowUpStyle}
          onClick={scrollToTop}
          className="fa fa-5x fa-angle-double-up"
        />
      </div>
    </div>
  );
}

const ArticleContainer = ({ title, link, imgSrc, date }) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div
      className="ui fluid card myCardNews"
      style={{ cursor: "pointer", transition: "0.3s" }}
      onClick={() => openInNewTab(link)}
    >
      <div className="image" style={{}}>
        <img src={imgSrc} alt="#" />
      </div>
      <div className="content" style={{}}>
        <p to="/home" className="header" style={{}}>
          {title}
        </p>
        <div className="meta">
          <span className="date" style={{}}>
            {date}
          </span>
        </div>
      </div>
      <div className="extra content" style={{ cursor: "pointer" }}>
        <i className="fa fa-book mr-2" style={{}} />
        <span>Read more</span>
      </div>
    </div>
  );
};

// design or styles
const scrollToTopStyle = {
  position: "absolute",
  bottom: "0%",
};
const arrowUpStyle = {
  cursor: "pointer",
  transition: "0.4s",
  transform: "scale(1)",
  color: "rgb(26, 26, 26,0.6)",
};

const recentNewsContainer = {
  position: "relative",
  height: "100vh",
  maxWidth: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const titleContentContainer = {
  position: "relative",
  height: "100%",
  width: "95%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "1s",
  padding: "2% 0",
};
const recentNewsInnerContainer = {
  width: "100%",
  overflowY: "auto",
  margin: 0,
  background: "rgb(0, 103, 161)",
  padding: "1% 2%",
  borderRadius: "0 0 7px 7px",
  boxShadow: "2px 5px 8px 0 #36454f",
};
const newsStyle = {
  padding: "12px",
  width: "100%",
  color: "white",
  background: "rgb(0, 0, 0)",
  borderRadius: "7px 7px 0 0",
  display: "flex",
  fontSize: "calc(26px + 2vw)",
  fontWeight: 900,
  margin: 0,
  boxShadow: "2px 5px 8px 0 #36454f, -6px -6px 8px 0 rgba(255, 255, 255, 0.8)",

  // protect from copy paste
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  UserSelect: "none",
};

// wallpaper background
const recentNewsBgStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  zIndex: -1,
  transform: "scaleY(-1)",
};

const displayLoader = {
  display: "grid",
  placeItems: "center",
  height: "100%",
};

const animateScrollTriggger = () => {
  gsap.from(".UPLBNewsClass", {
    scrollTrigger: {
      trigger: ".recentNewsContainer",
      scrub: 0.2,
    },
    xPercent: 90,
    duration: 1.5,
    scale: 1.4,
    opacity: 0.7,
  });
};
