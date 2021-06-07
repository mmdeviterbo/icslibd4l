import React, { useEffect, useState } from "react";
import TitleContainer from "./titleContainer";
import "../../styles/viewspt/viewSPTStyle.css";
import AbstractContainer from "./abstractContainer";
import ResourceService from "../../services/resourceService";
import InfoSidebar from "./sideInfoContainer";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const ReadingSPTContainer = (props) => {
  let [loading, setLoading] = useState(true);
  const [resourceData, setResourceData] = useState({});
  const resourceID = props.match.params;

  useEffect(() => {
    // <RingLoader loading />;
    async function fetchData() {
      try {
        const { data } = await ResourceService.searchByID(resourceID);
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
        <PropagateLoader
          color={"#0067a1"}
          speedMultiplier={2}
          loading={true}
          size={20}
        />
      ) : (
        <div className="spt-page-container">
          <TitleContainer
            title={resourceData.title}
            authorList={resourceData.authors}
            year={resourceData.year}
          />

          <div className="abstract-and-info">
            <AbstractContainer abstract={resourceData.abstract} />
            <InfoSidebar
              user={props.user}
              // title={resourceData.title}
              // id={resourceData.sp_thesis_id}
              // type={resourceData.type}
              // adviserList={resourceData.advisers}
              // keywords={resourceData.keywords}
              resourceData={resourceData}
            />
          </div>
        </div>
      )}
    </div>

    // add suggestions / related content at the bottom ..?
  );
};

export default ReadingSPTContainer;
