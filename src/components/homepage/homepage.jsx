import React from 'react'
import BrowsePart from './browsePart';
import LatestAcquisitions from './latestAcquisitions';
import RecentNews from './recentNews';
import SearchbarPart from './searchbarPart'
import { Link } from 'react-router-dom'
import AddResource from '../additem/add';
import ViewResource from '../additem/view';

export default function Homepage({browseRef, appRef}) {
    return (
        <div className="homepage-container">
            <Link to='/manage-resources' className="btn btn-info">Manage Resources</Link>
            <SearchbarPart/>
            <BrowsePart browseRef={browseRef}/>
            <LatestAcquisitions/>
            <RecentNews appRef={appRef}/>
        </div>
    )
}