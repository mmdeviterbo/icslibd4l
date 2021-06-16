import React, { useEffect, useState } from "react";
import TitleContainer from "./titleContainer";
import AbstractContainer from "./abstractContainer";
import ResourceService from "../../services/resourceService";
import InfoSidebar from "./sideInfoContainer";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/viewspt/viewSPTStyle.css";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 *  Resource type will be extracted from the id params
 *  using slice method.
 *  Makes a GET request using the id and resource
 *  type as params.
 *  Returned object will be rendered in the components
 *  accordingly.
 *
 ******************************************************/

const ReadingSPTContainer = (props) => {
  let [loading, setLoading] = useState(true);
  const [resourceData, setResourceData] = useState({});
  const resourceID = props.match.params.id;
  let resId = window.location.pathname.replace("/sp-thesis/","").replace("/book/","");

  let type = "";
  if (resourceID.slice(0, 3) === "SP_") {
    type = "Special Problem";
  } else if (resourceID.slice(0, 7) === "Thesis_") {
    type = "Thesis";
  } else if (resourceID.slice(0, 5) === "BOOK_") {
    type = "Book";
  }




  useEffect(() => {
    // <RingLoader loading />;
    async function fetchData() {
      try {
        const urlRequest = `/search-id?id=${resourceID || resId}`;
        const { data } = await ResourceService.searchByID(urlRequest, type);
        setResourceData(data && data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
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
          <div className="spt-page-container">
            <TitleContainer
              title={resourceData && resourceData.title}
              authorList={resourceData && resourceData.authors}
              year={resourceData && resourceData.year}
            />

            <div className="abstract-and-info">
              <AbstractContainer
                abstract={resourceData && resourceData.abstract}
              />
              <InfoSidebar user={props.user} resourceData={resourceData} type={type} resId={resId}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingSPTContainer;
