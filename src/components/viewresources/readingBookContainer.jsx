import React, { useEffect } from "react";
import TitleContainer from "./titleContainer";
import BookCoverandInfo from "./bookCoverInfoSide";
// import BookPhysDescription from "./bookPhysicalDescription";
import "../../styles/viewspt/viewSPTStyle.css";

const ReadingBookContainer = (props) => {
    const resourceData =
        (props.location && props.location.state.resourceData) || {};

    useEffect(() => {
        const {appRef} = props;
        appRef.current &&
        appRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);
    return (
        <div className="book-page-container">
            <TitleContainer
                title={resourceData.title}
                authorList={resourceData.author}
                year={resourceData.datePublished}
                item={"book"}
            />

            <div className="bookcover-and-desc">
                <img
                    style={{ height: "400px", width: "300px", margin: "0% 6%" }}
                    src="https://samsinternational.com/wp-content/themes/sams/dist/images/rug-no-thumb.jpg"
                />
                <BookCoverandInfo
                    isbn={resourceData.bookId}
                    publisher={resourceData.publisher}
                    numOfCopies={resourceData.numberOfCopies}
                    subjects={resourceData.subject}
                    physicalDesc={resourceData.physicalDesc}
                />
                {/* <BookPhysDescription physicalDesc={resourceData.physicalDesc} /> */}
            </div>
        </div>
    );
};

export default ReadingBookContainer;
