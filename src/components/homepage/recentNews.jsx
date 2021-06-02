import React, { useState, useEffect } from "react";
import recentNewsBg from "../../assets/searchBg_4.png";
import NewsService from "../../services/resourceService";
export default function RecentNews({ appRef, newsRef }) {
    const [titleNews, setTitleNews] = useState([]);
    const [dateNews, setDateNews] = useState([]);
    const [imgNews, setImgNews] = useState([]);
    const [linkNews, setLinkNews] = useState([]);

    const scrollToTop = () =>
        appRef.current &&
        appRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    const getNewsData = async () => {
        let { data } = await NewsService.getNews();
        setTitleNews(data.newsTitle);
        setDateNews(data.newsDate);
        setImgNews(data.newsImg);
        setLinkNews(data.newsLinks);
    };

    useEffect(() => {
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
                <p style={newsStyle}>UPLB NEWS</p>
                <div
                    className="ui three stackable cards"
                    style={recentNewsInnerContainer}
                >
                    {titleNews.map((title, index) => (
                        <ArticleContainer
                            title={title}
                            link={linkNews[index]}
                            imgSrc={imgNews[index]}
                            date={dateNews[index]}
                            key={index}
                            className="recentNewsTitle"
                        />
                    ))}
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
            className="ui fluid card"
            style={{ cursor: "pointer" }}
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
    width: "80%",
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
};
const newsStyle = {
    padding: "30px",
    width: "100%",
    color: "white",
    background: "rgb(0, 0, 0)",
    borderRadius: "5px 5px 0 0",
    display: "flex",
    fontSize: "calc(30px + 2vw)",
    fontWeight: 900,
    margin: 0,

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
