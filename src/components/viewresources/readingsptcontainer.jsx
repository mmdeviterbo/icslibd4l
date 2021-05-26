import React from "react";
import { useLocation } from "react-router-dom";
import TitleAuthorHere from "./title-container";
import "../../styles/viewspt/viewspt.css";
import AbstractContainer from "./abstract-container";
import InfoSidebar from "./side-info-container";

const ReadingSPTContainer = ({ sampleSP }) => {
  const location = useLocation();
  // const { resourceData } = location.state.resourceData;
  // console.log(resourceData);
  // console.log(userType)
  return (
    <div className="ViewSPTMainPageContainer">
      <TitleAuthorHere
        title={sampleSP.title}
        authorList={sampleSP.authorList}
        year={sampleSP.year}
      />

      <div className="abstract-and-info">
        <AbstractContainer abstract={sampleSP.abstract} />
        <InfoSidebar
          type={sampleSP.type}
          adviserList={sampleSP.adviserList}
          keywords={sampleSP.keywords}
        />
      </div>
    </div>

    // add suggestions / related content at the bottom ..?
  );
};

export default ReadingSPTContainer;