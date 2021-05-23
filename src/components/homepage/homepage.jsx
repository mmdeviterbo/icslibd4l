import React from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'
import { Link } from 'react-router-dom'
import AddResource from '../crud/add';
import ViewResource from '../crud/view';

export default function Homepage({browseRef, appRef, newsRef, latestAcqRef}) {
    return (
        <div className="homepage-container">
            {/* <Link to='/manage-resources' className="btn btn-info">Manage Resources</Link> */}
            <SearchbarPart newsRef={newsRef} latestAcqRef={latestAcqRef} browseRef={browseRef}/>
            <BrowsePart browseRef={browseRef}/>
            <LatestAcquisitions latestAcqRef={latestAcqRef}/>
            <RecentNews appRef={appRef} newsRef={newsRef}/>
        </div>
    )
}
