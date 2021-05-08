import React,{useEffect} from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'
import { Link } from 'react-router-dom'
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import AddItem from '../additem/add';
gsap.registerPlugin(ScrollTrigger)




export default function Homepage() {
    useEffect(()=>{
        gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 40px", scrub:0,}}).from('.homepage-container',{background: "linear-gradient(to right, #d3cce3, #e9e4f0)"})
    },[])
    
    return (
        <div className="homepage-container" style={homepageContainer}>
            <AddItem/>
            <SearchbarPart/>
            <BrowsePart/>
            <LatestAcquisitions/>
            <RecentNews/>
        </div>
    )
}

const homepageContainer = {
    fontFamily: 'Montserrat',
}


