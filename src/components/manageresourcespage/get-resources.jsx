import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import ManageResPage from "../manageresourcespage/manageresourcespage";
import ResTableContainer from "../manageresourcespage/resource-table-cont";
import ReadingSPTContainer from "../viewresources/readingsptcontainer";

export default function GetResources({ resourceType }) {
  const location = useLocation();
  const [resourceList, setResourceList] = useState([]);
  console.log(resourceType);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ResourceService.browseResources({
          resourceType: resourceType,
        });
        setResourceList(response.data);
        // console.log(spthesisList)
        // setSpThesisList(spThesis_arr)
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
