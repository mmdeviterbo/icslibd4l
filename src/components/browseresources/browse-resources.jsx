import { useState, useEffect } from "react";
import React from "react";
import ResourceService from "../../services/resourceService";
import viewTable from "./viewTable";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import ManageResPage from "../manageresourcespage/manageresourcespage";
import ResTableContainer from "../manageresourcespage/resource-table-cont";

export default function BrowseResources({ type }) {
  const [resourceList, setResourceList] = useState([]);
  const [items, setItems] = useState();

  const { TblContainer } = viewTable();
  // console.log(type);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ResourceService.browseResources({ type: type });
        setResourceList(response.data);
        // console.log(spthesisList)
        // setSpThesisList(spThesis_arr)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // temp var

  // const resource = Object.keys(spthesisList)
  // console.log(resource)

  // const showData = (props) => {
  //     console.log(props)
  // }

  return (
    <div className="viewitem-container">
      <ManageResPage resourceList={resourceList} />
      {/* <ResTableContainer resourceList={resourceList} /> */}

      {/* <h1>Sp/Thesis</h1>
      <TblContainer>
        <TableBody>
          {resourceList.map((item) => (
            <TableRow key={item.sp_thesis_id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.journal}</TableCell>
              <TableCell>{item.author_lname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer> */}
    </div>
  );
}
