import React from 'react';
import TitleAuthorHere from './title-container';
import BookCoverandInfo from './bookcoverinfoside';
import BookPhysDescription from './book-phys-desc';
import '../../styles/viewspt/viewspt.css';

const ReadingBookContainer = () => {
    return(
        <div className = "bookpagecontainer" >
            <TitleAuthorHere/>

            <div className = "bookcover-and-desc">
                <BookCoverandInfo/>
                <BookPhysDescription/>
            </div>

        </div>
    )
}


export default ReadingBookContainer;