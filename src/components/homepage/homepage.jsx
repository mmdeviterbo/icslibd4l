import React from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'

export default function Homepage({browseRef, appRef}) {
    return (
    <div className="homepage-container">
            <SearchbarPart/>
            <BrowsePart browseRef={browseRef}/>
            <LatestAcquisitions/>
            <RecentNews appRef={appRef}/>
        </div>
    )
}