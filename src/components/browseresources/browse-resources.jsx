import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import viewTable from "./viewTable";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import ManageResPage from "../manageresourcespage/manageresourcespage";
import ResTableContainer from "../manageresourcespage/resource-table-cont";
import ReadingSPTContainer from "../viewresources/readingsptcontainer";

export default function BrowseResources({ resourceType }) {
  const location = useLocation();
  const [resourceList, setResourceList] = useState([]);

  const { TblContainer } = viewTable();
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
      {/* <ManageResPage resourceList={resourceList} /> */}

      <h1>Sp/Thesis</h1>
      <TblContainer>
        <TableBody>
          {resourceList.map((item) => (
            <TableRow key={item.sp_thesis_id}>
              <TableCell>
                <Link
                  to={{
                    pathname: "/view-sp-thesis",
                    state: {
                      background: location,
                      resourceData: item,
                    },
                  }}
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                {item.author.map((author, key) => (
                  <div key={key}>{author.author_name}</div>
                ))}
              </TableCell>
              <TableCell>
                {/* {item.adviser.map((adviser, key) => (
                  <div key={key}>{adviser.adviser_name}</div>
                ))} */}
              </TableCell>
              <TableCell>{item.year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
    </div>
  );
}
