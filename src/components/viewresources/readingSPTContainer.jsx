import React, { useEffect } from "react";
import TitleContainer from "./titleContainer";
import "../../styles/viewspt/viewSPTStyle.css";
import AbstractContainer from "./abstractContainer";
import InfoSidebar from "./sideInfoContainer";

const ReadingSPTContainer = (props) => {
    const resourceData =
        (props.location && props.location.state.resourceData) || {};

    useEffect(() => {
        console.log(resourceData);
    }, []);

    return (
        <div className="spt-page-container">
            <TitleContainer
                title={resourceData.title}
                authorList={resourceData.author}
                year={resourceData.year}
            />

            <div className="abstract-and-info">
                <AbstractContainer abstract={resourceData.abstract} />
                <InfoSidebar
                    type={resourceData.type}
                    adviserList={resourceData.adviser}
                    keywords={resourceData.keywords}
                />
            </div>
        </div>

        // add suggestions / related content at the bottom ..?
    );
};

export default ReadingSPTContainer;
