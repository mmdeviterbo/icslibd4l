import React, {useState, useEffect} from 'react'
import CardBook from './cardBook';


export default function LatestAcquisitions() {
    const [acquisitions, setacquisitions] = useState([
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover1', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover2', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover3', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover4', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover5', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover6', linkTo:'/home'},
        {imageSrc:'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105', title:'My Book Cover7', linkTo:'/home'},
    ]);

    return (
        <div className="latestAcquisitions" style={latestAcquisitionsContainer}>
            <div style={captionContainer} className="captionContainer">
                <p style={captionStyle}>Latest Acquisitions</p>
                <hr style={horizontalLine}/>
            </div>

            <div style={acquisitionsInnerContainer} className="acquisitionsInnerContainer">
                {acquisitions.map(book=><CardBook 
                    imageSrc={book.imageSrc} title={book.title} linkTo={book.linkTo}
                    key={book.title}
                />)}
            </div>
        </div>
    )
}

const latestAcquisitionsContainer={
    "minHeight": "45vh",
    background:"white",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    padding:0
}
const acquisitionsInnerContainer = {
    width:"80vw",  
    padding:"10px",
    display:"grid",
    gridTemplateColumns:"auto auto auto auto auto auto auto",
    justifyContent:"space-between",
    overflowX:"auto"
}
const captionStyle = {
    margin:0,
    padding:0,
    fontSize:"32px",
    fontWeight:"700",
    paddingTop:"10px",
}
const captionContainer = {
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
    width:"80vw",
}
const horizontalLine = {
    lineHeight:0,
    borderTop: "3px solid gray"
}

// mobile responsiveness is in homepagestyle.css 