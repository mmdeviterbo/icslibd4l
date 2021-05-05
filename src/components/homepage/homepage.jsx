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
        </div>
    )
}
const homepageContainer = {
    backgroundColor: "#f3f4f7",
    backgroundImage: "linear-gradient(315deg, #f3f4f7 0%, #caccd1 74%)",
    fontFamily: 'Montserrat',
}


