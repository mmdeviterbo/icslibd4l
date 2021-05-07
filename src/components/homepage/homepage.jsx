import React from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'

export default function Homepage() {
    return (
        <div className="homepage-container" style={homepageContainer}>
            <SearchbarPart/>
            <BrowsePart/>
            <LatestAcquisitions/>
            <RecentNews/>
            
            <div className="browseResources-homepage"> </div>
        </div>
    )
}
const homepageContainer = {
    backgroundColor: "#E9E9E9",
    fontFamily: 'Montserrat',
}
