import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import ManageResPage from "../manageresourcespage/manageResourcePage";
import ResTableContainer from "../manageresourcespage/resourceTableContainer";
import ReadingSPTContainer from "../viewresources/readingSPTContainer";

export default function GetResources({ resourceType }) {
  const location = useLocation();
  const [resourceList, setResourceList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await ResourceService.browseResources({resourceType});
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
