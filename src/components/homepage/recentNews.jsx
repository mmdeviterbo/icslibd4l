import React from 'react'
import {Link} from 'react-router-dom';

// temporary, news should be from the database
const newsList = [
    {title:"News Title 1", content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae!", date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 2", content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae!", date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 3", content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae!", date:"26 January 2021", linkTo:"/home"}
]

export default function RecentNews() {
    return (
        <div className="recentNewsContainer" style={recentNewsContainer}>
            <div className="recentNewsInnerContainer" style={recentNewsInnerContainer}>
                <p style={recentNewsTitle} className="recentNewsTitle">Recent News</p> 
                <hr style={horizontalLine}/>
                {newsList.map(news=><ArticleContainer 
                    news={news} key={news.title}
                    className="recentNewsTitle"
                />)}
            </div>
        </div>
    )
}

// reusable template for article/recent news
const ArticleContainer=({news})=>{
    return(
            <>
                <Link style={recentNewsHeader} className="recentNewsHeader" to={news.linkTo}>
                    {news.title}
                </Link>    
                <p className="recentNewsCaption">{news.content}</p>
                <p className="recentNewsCaption">{news.date}</p>
                <hr style={{lineHeight:0,borderTop: "1px solid gray"}}/>
            </>)
}


const recentNewsContainer={
    "minHeight": "45vh",
    background:"white",
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
    alignItems:"center",
    padding:0
}
const recentNewsInnerContainer = {
    width:"80vw",
}

const recentNewsTitle = {
    margin:0,
    fontSize:"32px",
    fontWeight:"700",
    padding:"30px 0px 0px 0px",
}
const recentNewsHeader = {
    fontSize:"21px",
    fontWeight:"500",
}
const horizontalLine = {
    lineHeight:0,
    borderTop: "3px solid gray"
}