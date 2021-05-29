import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import viewTable from "./viewTable";
import { TableBody, TableCell, TableRow, TableHead } from "@material-ui/core";
import dateFormat from "dateformat";
// import ResTableContainer from "../manageresourcespage/resource-table-cont";
import ReadingSPTContainer from "../viewresources/readingSPTContainer";

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

  const sampleSP = {
    title:
      "Adaptive Identification of Rice and Corn Pests (Order Hemiptera) using Back Propagation Neural Network Based on Intensity Histogram",
    type: "Special Problem",
    abstract:
      "Pest identification through image processing using Back Propagation Neural Network with Intensity Histogram as the feature used as basis for classification yielded an accuracy of 100% using 15 test images from each species. However, the application is only limited to pest images that have distinguishable backgrounds. The reliability of the system can be further increased by adding more training data with plain background. This research aims to help users by giving additional information about the pest identified by the system such as description, treatment, and control.",
    year: 1969,
    authorList: ["Concepcion L. Khan", "John Viscel M. Sangkal"],
    adviserList: [
      "Maria Erika Dominique Cunanan",
      "Katrina Joy M. Abriol-Santos",
    ],
    keywords: ["CMSC191", "CMSC173", "CMSC69"],
  };

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
