import React,{useEffect} from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'

import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)




export default function Homepage() {
    useEffect(()=>{
        gsap.timeline({scrollTrigger: {trigger: ".navbar-container", start:"10px top", end:"bottom 10px", scrub:0,}}).to('.homepage-container',{background: "#4b79a1"})
    },[])
    
    return (
        <div className="homepage-container" style={homepageContainer}>
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


