import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import ManageResourcesPage from "./manageresourcespage";

// TODO: add documentation
export default function GetResources({ resourceType }) {
    // const location = useLocation();
    const [resourceList, setResourceList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await ResourceService.browseResources({
                    resourceType,
                });
                setResourceList(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="viewitem-container">
            <ManageResourcesPage resourceList={resourceList} />
        </div>
    );
}
