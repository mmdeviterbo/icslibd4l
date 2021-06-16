import React from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'

export default function Homepage({ browseRef, appRef, newsRef, latestAcqRef }) {
    return (
        <div className="homepage-container">
            <SearchbarPart/>
            <BrowsePart browseRef={browseRef}/>
            <LatestAcquisitions latestAcqRef={latestAcqRef}/>
            <RecentNews appRef={appRef} newsRef={newsRef}/>
        </div>
    );
}
