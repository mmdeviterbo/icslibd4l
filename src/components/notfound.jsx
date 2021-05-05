import React,{useEffect} from 'react';
import notFound from '../assets/notFound_1.png'
import {gsap} from 'gsap';
import '../styles/notFoundStyle.css'; 

export default function Notfound() {
    useEffect(()=>{
        gsap.from('.white-notfound',{
            duration:1,
            x:-50,
            scale:0.5
        });
    },[])

    return (
        <div className="notFoundContainer">
            <img src={notFound} alt="#" className="notFoundPicture"/>
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
        </div>
    )
}
