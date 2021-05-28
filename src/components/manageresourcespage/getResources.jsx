import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import ManageResPage from "../manageresourcespage/manageResourcePage";

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
            <ManageResPage resourceList={resourceList} />
        </div>
    );
}
