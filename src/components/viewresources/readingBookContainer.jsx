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
        setLoading(true);
        const urlRequest = `/search-id?id=${resourceID}`;
        const { data } = await ResourceService.searchByID(urlRequest, "Book");
        setResourceData(data && data[0]);
        setLoading(false);
        // handleLoading();
      } catch (err) {}
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <PropagateLoader
            color={"#0067a1"}
            speedMultiplier={2}
            loading={true}
            size={20}
          />
        </div>
      ) : (
        <div className="reading-main-container">
          <div className="book-page-container">
            <TitleContainer
              title={resourceData && resourceData.title}
              authorList={resourceData && resourceData.author}
              year={resourceData && resourceData.datePublished}
              item={"book"}
            />

            <div className="bookcover-and-desc">
              <div className="imgContainerBook">
                {resourceData && resourceData.bookCoverLink ? (
                  <>
                    {imgLoading && (
                      <div
                        style={{
                          height: "100%",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <PropagateLoader
                          color={"#0067a1"}
                          speedMultiplier={2}
                          loading={true}
                          size={20}
                        />
                      </div>
                    )}
                    <img
                      draggable={false}
                      className="imgBook"
                      src={resourceData.bookCoverLink}
                      alt="bookCover"
                      onLoad={() => setImgLoading(false)}
                    />
                  </>
                ) : (
                  <img
                    draggable={false}
                    className="imgBook"
                    src="https://samsinternational.com/wp-content/themes/sams/dist/images/rug-no-thumb.jpg"
                    alt="bookCover"
                  />
                )}
              </div>

              <BookCoverandInfo
                isbn={resourceData && resourceData.ISBN}
                publisher={resourceData && resourceData.publisher}
                numOfCopies={resourceData && resourceData.numberOfCopies}
                subjects={resourceData && resourceData.subject}
                physicalDesc={resourceData && resourceData.physicalDesc}
              />

              {/* <BookPhysDescription physicalDesc={resourceData.physicalDesc} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingBookContainer;
