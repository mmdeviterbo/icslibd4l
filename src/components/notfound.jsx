import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {gsap} from 'gsap';
import notFoundHover from '../assets/notFound_1_hover.png';
import notFound from '../assets/notFound_1.webp'
import '../styles/notFoundStyle.css'; 


export default function Notfound() {
    useEffect(()=>{
        gsap.from('.white-notfound',{
            duration:0.5,
            xPercent:-50,
            scale:1.5,
        });
    },[])

    return (
        <Link className="notFoundContainer" to="/home">
            <img src={notFound} alt="#" className="notFoundPicture"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover1"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover2"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover3"/>

            <div className="white-notfound">
                <p className="title-notfound">
                    404 <br/>Not <br/>Found
                </p>
                <div style={{margin:"auto"}}>
                    <img src="https://img.icons8.com/wired/64/ffffff/road-closure.png" alt="#"/>
                </div>
                <hr style={{borderTop:"0.5px solid white"}}/>
                <p className="caption-notfound">The page you are looking for might been removed.</p>
            </div>
        </Link>
    )
}
