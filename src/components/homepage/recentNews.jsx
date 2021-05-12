import React from 'react'
import {Link} from 'react-router-dom';
import recentNewsBg from '../../assets/searchBg_4.png';


const news = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore quaerat iusto molestias impedit tenetur. Aut, ab, ea ipsa tenetur, quis at minus dicta repellendus quas cum perspiciatis temporibus rerum veniam ratione corrupti commodi reprehenderit. Vitae ad voluptatem, tenetur nesciunt voluptate porro animi facere corporis odit eveniet magnam dolores voluptatibus possimus beatae dolorum ut architecto nihil reprehenderit fuga aut sapiente in ducimus delectus. Reiciendis eaque, tempora soluta aliquid dolor facere in repudiandae nobis nostrum odit. Quae dicta corrupti totam corporis cupiditate autem consequatur officia cumque ducimus. Ratione velit quae quam inventore porro impedit unde molestias, a modi veniam? Architecto, fugiat fuga!"


// temporary, news should be from the database
const newsList = [
    {title:"News Title 1", content:news, date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 1.1", content:news, date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 1.2", content:news, date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 2", content:news, date:"26 January 2021", linkTo:"/home"},
    {title:"News Title 3", content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, vitae!", date:"26 January 2021", linkTo:"/home"}
]

export default function RecentNews({appRef, newsRef}) {
    const scrollToTop=()=> appRef.current && appRef.current.scrollIntoView({behavior:"smooth",block:"start"});
    return (
        <div className="recentNewsContainer" style={recentNewsContainer} ref={newsRef}>
            <img src={recentNewsBg} style={recentNewsBgStyle} alt="#"/>

            <div style={titleContentContainer} className="titleContentContainer">
                <div style={newsStyle} className="newsStyle">NEWS</div>
                <div className="recentNewsInnerContainer" style={recentNewsInnerContainer}>
                    {newsList.map(news=><ArticleContainer 
                        news={news} key={news.title}
                        className="recentNewsTitle"
                    />)}
                </div>
            </div>
            <div style={scrollToTopStyle}>
                <i style={arrowUpStyle} onClick={scrollToTop} className="fa fa-5x fa-angle-double-up"/>
            </div>
        </div>
    )
}

// reusable template for article/recent news
const ArticleContainer=({news})=>{
    return(
            <div style={recentNewsTitle}>
                <Link to={news.linkTo}><p className="recentNewsHeader" style={recentNewsHeader}>{news.title}</p></Link>    
                <p className="recentNewsCaption" style={recentNewsCaption}>{news.content}</p>
                <p className="recentNewsCaption" style={recentNewsCaption}>{news.date}</p>
            </div>)
}
const scrollToTopStyle = {
    position:"absolute",
    bottom:"0%"
}
const arrowUpStyle = {
    cursor:"pointer",
    transition:"0.4s",
    transform:"scale(1)",
    color:"rgb(26, 26, 26,0.6)"
}


const recentNewsCaption = {
    padding:"10px",
}
const titleContentContainer={
    position:"relative",
    height:"100%",
    width:"75%",
    display:"flex",
    justifyContent:"center",
    transition:"1s",
    padding:"5px 0 20px 0",
}
const recentNewsContainer={
    position:"relative",
    height: "85vh",
    maxWidth:"100vw",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}
const recentNewsInnerContainer = {
    width:"85%",
    display:"grid",
    gridTemplateColumns:"auto",
    overflowY:"auto",
    background:"white",
    "boxShadow": "-2px -2px 10px 0 rgba(255, 255, 255, 0.1), 8px 8px 10px 0 rgba(0, 0, 0, .45)"
}

const recentNewsTitle = {}

const recentNewsHeader = {
    fontSize:"21px",
    fontWeight:900,
    color:"white",
    background:"rgb(0, 103, 161,0.8)",
    padding:"calc(10px + 0.5vw)"
}
const newsStyle = {
    borderRadius:"10px 0 0 10px",
    color:"white",
    background:"rgb(0, 0, 0)",
    writingMode: "vertical-lr",
    textOrientation: "upright",
    display:"flex",
    justifyContent:"center",
    fontSize:"calc(30px + 2vw)",
    height:"100%",
    fontWeight:900,
    padding:"0 calc(20px + 1vw)",
    // protect from copy paste
    "WebkitUserSelect": "none",
    "WebkitTouchCallout": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "UserSelect": "none",
}
// wallpaper background
const recentNewsBgStyle = {
    position:"absolute",
    height:"100%",
    width:"100%",
    zIndex:-1,
    transform:"scaleY(-1)"
}