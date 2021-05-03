import React from 'react';
import '../styles/notFoundStyle.css'; 
import notFound from '../assets/notFound_1.png'

export default function Notfound() {
    return (
        <div className="notFoundContainer">
            <img src={notFound} alt="#" className="notFoundPicture"/>
            <div className="white-notfound">
                <p className="title-notfound">404 <br/>Not <br/>Found</p>
                <hr style={{borderTop:"0.5px solid white"}}/>
                <p className="caption-notfound">The page you are looking for might been removed.</p>

            </div>
        </div>
    )
}
