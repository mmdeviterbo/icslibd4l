import React, { useEffect } from "react";

import TitleContainer from "./titleContainer";
import BookCoverandInfo from "./bookCoverInfoSide";
import BookPhysDescription from "./bookPhysicalDescription";
import "../../styles/viewspt/viewSPTStyle.css";

const ReadingBookContainer = (props) => {
    const resourceData =
        (props.location && props.location.state.resourceData) || {};

    useEffect(() => {
        console.log(resourceData);
    }, []);
    return (
        <div className="bookpagecontainer">
            <TitleContainer
                title={resourceData.title}
                authorList={resourceData.author}
                year={resourceData.datePublished}
                item={"book"}
            />
            <div className="bookcover-and-desc">
                <BookCoverandInfo
                    isbn={resourceData.bookId}
                    publisher={resourceData.publisher}
                    numOfCopies={resourceData.numberOfCopies}
                    subjects={resourceData.subject}
                />
                <BookPhysDescription physicalDesc={resourceData.physicalDesc} />
            </div>
        </div>
    );
};

export default ReadingBookContainer;
