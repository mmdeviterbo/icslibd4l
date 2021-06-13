import React,{useEffect} from 'react';
import {gsap} from 'gsap';
import {Link} from 'react-router-dom';
import notFoundHover from '../assets/notFound_1_hover.png';
import '../styles/notFoundStyle.css'; 
import notFound from '../assets/notFound_1.webp'


export default function Unauthorized() {
    useEffect(()=>{
        gsap.from('.white-notfound',{
            duration:0.5,
            xPercent:-50,
            scale:1.5,
        });
    },[])

    return (
        <div className="notFoundContainer">
            <img src={notFound} alt="#" className="notFoundPicture"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover1"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover2"/>
            <img src={notFoundHover} alt="#" className="notFoundhoverEffect notFoundhover3"/>

            <div className="white-notfound">
                <p className="title-notfound">
                    401 <br/><br/>Unauthorized
                </p>
                <div style={{margin:"auto"}}>
                    <img src="https://img.icons8.com/wired/64/ffffff/data-encryption.png"/>
                </div>
                <hr style={{borderTop:"0.5px solid white"}}/>
                <p className="caption-notfound">Unauthorized access.</p>
            </div>
        </div>
    )
}
