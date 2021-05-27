import React from 'react';
import TitleAuthorHere from './titleContainer';
import BookCoverandInfo from './bookCoverInfoSide';
import BookPhysDescription from './bookPhysicalDescription';
import '../../styles/viewspt/viewspt.css';

const ReadingBookContainer = ({sampleBook}) => {
    return(
        <div className = "bookpagecontainer" >
            <TitleAuthorHere title={sampleBook.title} authorList={sampleBook.authorList} year={sampleBook.year}/>
            <div className = "bookcover-and-desc">
                <BookCoverandInfo publisher={sampleBook.publisher} numOfCopies={sampleBook.numOfCopies} subjects={sampleBook.subjects}/>
                <BookPhysDescription physicalDesc={sampleBook.physicalDesc}/>
            </div>

        </div>
    )
}


export default ReadingBookContainer;