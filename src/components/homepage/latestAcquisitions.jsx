import React, {useState, useEffect} from 'react'
import CardBook from './cardBook';
import latestAcqBg from '../../assets/searchBg_4.png';

export default function LatestAcquisitions() {
    const [acquisitions, setacquisitions] = useState([
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover1', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover2', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover3', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover4', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover5', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover6', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover7', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover8', linkTo:'/home'},
    ]);

    const [hoverText, setHoverText] = useState("");
    return (
        <div className="latestAcquisitions" style={latestAcquisitionsContainer}>
            <img src={latestAcqBg} style={latestAcqBgStyle} alt="#"/>
            <div style={colorsParent} className="latestAcqcolorsParent">
                <div style={whiteBg}>
                    <span style={hoverTextStyleWhite}>{hoverText}</span>
                    <div style={acquisitionsInnerContainer} className="acquisitionsInnerContainer">
                        {acquisitions.map(book=><CardBook className="cardContainer"
                            imageSrc={book.imageSrc} title={book.title} 
                            linkTo={book.linkTo} key={book.title}
                            setHoverText={setHoverText}
                        />)}
                    </div>
                </div>
                <div style={blueBg}>
                    <span style={hoverTextStyle}>{hoverText}</span>
                    <div style={textBgContainer}>
                        <h3 style={textBg} className="latestAcqhoverTextStyle">LATEST<br/>ACQUISITIONS</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

const latestAcquisitionsContainer={
    position:"relative",
    height: "90vh",
    background:"white",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    "filter": "brightness(1)",
    transition:"0.8s",

    // protect from copy paste
    "WebkitUserSelect": "none",
    "WebkitTouchCallout": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "UserSelect": "none",
}
const acquisitionsInnerContainer = {
    minHeight:"auto",
    maxHeight:"100%",
    display:"grid",
    justifyContent:"center",
    gridTemplateColumns:"auto",
    overflow:"auto auto",
    transition:"0.8s"
}
const latestAcqBgStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:-1,
}

const colorsParent = {
    position:"relative",
    height:"80%",
    width:"70%",    
    zIndex:0,
    display:"flex",
    borderRadius:"0px 30px 30px 0px",
    overflow:"hidden",
    boxShadow: "4px 4px 20px black",
}

const whiteBg = {
    height:"100%",
    width:"60%",
    background:"rgba(255,255,255,0.8)",
    zIndex:1,
}
const blueBg = {
    position:"relative",
    background:"#0067A1",
    height:"100%",
    width:"40%",
    zIndex:1,
    overflow:"hidden",
    boxShadow: "2px 5px 10px 0 rgba(0, 0, 0, 0.8), -6px -6px 6px 0 rgba(255, 255, 255, 0.8)",
}
const textBgContainer = {
    height:"100%",
    width:"100%",
    background:"#0067A110",
    zIndex:100,
    display:"grid",
    placeItems:"center",
    wordBreak:"break-all"

}
const textBg={
    margin:0,
    fontSize:"calc(20px + 2vw)",
    background:"rgba(255,255,255,0.05)",
    color:"white",
    fontWeight:900,
    width:"100%",
    textAlign:"center"
}

const hoverTextStyle = {
    position:"absolute",
    fontSize:"250px",
    fontWeight:900,
    lineHeight:"1",
    color:"rgba(10,10,10,0.04)"
}

const hoverTextStyleWhite = {
    ...hoverTextStyle,
    fontSize:"150px",
    textAlign:"center",
    writingMode: "vertical-lr",
    textOrientation: "upright"
}

// mobile responsiveness is in homepagestyle.css 