import React from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import TitleAuthorHere from "./titleContainer";
import "../../styles/viewspt/viewSPTStyle.css";
import AbstractContainer from "./abstractContainer";
import InfoSidebar from "./sideInfoContainer";

const ReadingSPTContainer = ({ resourceData }) => {
    const { resourceData } = useParams();
    const location = useLocation();
    // console.log(resourceData);
    // console.log(userType)
    { location.

    }
    return (
        <div className="ViewSPTMainPageContainer">
            <TitleAuthorHere
                title={resourceData.title}
                authorList={resourceData.authorList}
                year={resourceData.year}
            />

            <div className="abstract-and-info">
                <AbstractContainer abstract={resourceData.abstract} />
                <InfoSidebar
                    type={resourceData.type}
                    adviserList={resourceData.adviserList}
                    keywords={resourceData.keywords}
                />
            </div>
        </div>

        // add suggestions / related content at the bottom ..?
    );
};

export default ReadingSPTContainer;
