import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import viewTable from "./viewTable";
import { TableBody, TableCell, TableRow, TableHead } from "@material-ui/core";
import dateFormat from "dateformat";
// import ResTableContainer from "../manageresourcespage/resource-table-cont";
// import ReadingSPTContainer from "../viewresources/readingsptcontainer";

export default function BrowseResources({ type }) {
  const location = useLocation();
  const [resourceList, setResourceList] = useState([]);

  const { TblContainer } = viewTable();

  async function fetchData() {
    try {
      const { data } = await ResourceService.browseResources({ type });
      setResourceList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const ViewSPThesis = () => {
    return (
      <div>
        <p style={{ fontSize: "calc(30px + 0.5vw)", fontWeight: "900" }}>
          Special Problems and Theses
        </p>
        <TblContainer>
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Title</h3>
              </TableCell>
              <TableCell>
                <h3>Type</h3>
              </TableCell>
              <TableCell>
                <h3>Author/s</h3>
              </TableCell>
              <TableCell>
                <h3>Year</h3>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {resourceList.map((item) => (
              <TableRow key={item && item.sp_thesis_id}>
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
                    <p style={captionStyle}>{item && item.title}</p>
                  </Link>
                </TableCell>
                <TableCell>
                  <p style={bodyStyle}>{item && item.type}</p>
                </TableCell>
                <TableCell key={item && item.sp_thesis_id}>
                  {item &&
                    item.author.map((author, key) => (
                      <div key={key}>
                        <p style={bodyStyle}>{author.author_name}</p>
                      </div>
                    ))}
                </TableCell>
                <TableCell>
                  <p style={bodyStyle}>{dateFormat(item.year, "mmmm yyyy")}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </div>
    );
  };

  const ViewBook = () => {
    return (
      <div>
        <p style={{ fontSize: "calc(30px + 0.5vw)", fontWeight: "900" }}>
          Special Problems and Theses
        </p>
        <TblContainer>
          <TableHead>
            <TableRow>
              <TableCell>
                <h3>Title</h3>
              </TableCell>
              <TableCell>
                <h3>Author/s</h3>
              </TableCell>
              <TableCell>
                <h3>Publisher</h3>
              </TableCell>
              <TableCell>
                <h3>Date Published</h3>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {resourceList.map((item) => (
              <TableRow key={item && item.sp_thesis_id}>
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
                    <p style={captionStyle}>{item && item.title}</p>
                  </Link>
                </TableCell>
                <TableCell key={item && item.sp_thesis_id}>
                  {item &&
                    item.author.map((author, key) => (
                      <div key={key}>
                        <p style={bodyStyle}>{author.author_name}</p>
                      </div>
                    ))}
                </TableCell>
                <TableCell>
                  <p style={bodyStyle}>{item && item.publisher}</p>
                </TableCell>
                <TableCell>
                  <p style={bodyStyle}>
                    {dateFormat(item.datePublished, "mmmm yyyy")}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </div>
    );
  };

  return (
    <div
      className="viewitem-container"
      style={{ padding: "5vw 3vw", minHeight: "90vh" }}
    >
      {type == "book" ? <ViewBook /> : <ViewSPThesis />}
    </div>
  );
}

const captionStyle = {
  fontSize: "calc(10px + 0.2vw)",
};

const bodyStyle = {
  fontSize: "calc(10px + 0.2vw)",
};
