import React, { useEffect, useState } from "react";
import TitleContainer from "./titleContainer";
import BookCoverandInfo from "./bookCoverInfoSide";
import ResourceService from "../../services/resourceService";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/viewspt/viewSPTStyle.css";

const ReadingBookContainer = (props) => {
  // const resourceData =
  //   (props.location && props.location.state.resourceData) || {};

  let [loading, setLoading] = useState(true);
  let [imgLoading, setImgLoading] = useState(true);
  const [resourceData, setResourceData] = useState({});
  const resourceID = props.match.params.id;
  // console.log(props.match.params);

  // const handleLoading = () => {
  //   console.log(resourceData.bookCoverLink);
  //   if (resourceData && resourceData.bookCoverLink) {
  //     return setLoading(true);
  //   }
  // };
  useEffect(() => {
    async function fetchData() {
      try {
        const urlRequest = `/search-id?id=${resourceID}`;
        const { data } = await ResourceService.searchByID(urlRequest, "Book");
        setResourceData(data && data[0]);
        console.log(data);
        setLoading(false);
        // handleLoading();
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

    window.scrollTo(0, 0);
    // const { appRef } = props;
    // appRef.current &&
    //   appRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
  }, []);
  return (
    <div>
      {loading ? (
        <PropagateLoader
          color={"#0067a1"}
          speedMultiplier={2}
          loading={true}
          size={20}
        />
      ) : (
        <div className="book-page-container">
          <TitleContainer
            title={resourceData && resourceData.title}
            authorList={resourceData && resourceData.author}
            year={resourceData && resourceData.datePublished}
            item={"book"}
          />

          <div className="bookcover-and-desc">
            {loading ? (
              <PropagateLoader
                color={"#0067a1"}
                speedMultiplier={2}
                loading={true}
                size={20}
              />
            ) : resourceData && resourceData.bookCoverLink ? (
              <img
                style={{ height: "auto", margin: "0% 6%" }}
                src={resourceData.bookCoverLink}
                // alt="bookCover"
              />
            ) : (
              <img
                style={{ height: "400px", width: "300px", margin: "0% 6%" }}
                src="https://samsinternational.com/wp-content/themes/sams/dist/images/rug-no-thumb.jpg"
                // alt="bookCover"
              />
            )}

            <BookCoverandInfo
              isbn={resourceData && resourceData.bookId}
              publisher={resourceData && resourceData.publisher}
              numOfCopies={resourceData && resourceData.numberOfCopies}
              subjects={resourceData && resourceData.subject}
              physicalDesc={resourceData && resourceData.physicalDesc}
            />

            {/* <BookPhysDescription physicalDesc={resourceData.physicalDesc} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingBookContainer;
