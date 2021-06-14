import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResourceService from "../../services/resourceService";
import viewTable from "./viewTable";
import { TableBody, TableCell, TableRow, TableHead } from "@material-ui/core";
import dateFormat from "dateformat";
import PropagateLoader from "react-spinners/PropagateLoader";
// import ReadingSPTContainer from "../viewresources/readingSPTContainer";
// import ReadingSPTContainer from "../viewresources/readingsptcontainer";

export default function BrowseResources({ type }) {
  const [resourceList, setResourceList] = useState([]);
  const [loader, setLoader] = useState(true);

  const { TblContainer } = viewTable();

  useEffect(() => {
    setLoader(true);
    async function fetchData() {
      try {
        const { data } = await ResourceService.browseResources({ type });
        setResourceList(data);
        setLoader(false);
      } catch (error) {}
    }
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const ViewSPThesis = () => {
    return (
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "calc(30px + 0.5vw)",
              fontWeight: "900",
              margin: 0,
            }}
          >
            Special Problem and Thesis
          </p>
          <button
            className="gotoBookClass"
            to="/browse-books"
            style={{
              float: "right",
              fontSize: "calc(14px + 0.2vw)",
              color: "black",
              borderRadius: "2px",
              padding: "10px 30px",
              transition: "0.2s",
              background: "none",
              border: "none",
            }}
            onClick={() => (window.location = "/browse-books")}
          >
            Browse Books
            <i class="fa ml-2 fa-chevron-right"></i>
            <i class="fa fa-chevron-right"></i>
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>

        {loader ? (
          <div
            style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}
          >
            <PropagateLoader
              color={"#0067a1"}
              speedMultiplier={2}
              loading={loader}
              size={20}
            />
          </div>
        ) : (
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
              {resourceList &&
                resourceList.map((item) => (
                  <TableRow key={item && item.sp_thesis_id}>
                    <TableCell>
                      <Link
                        to={{
                          pathname: `/sp-thesis/${item.sp_thesis_id}`,
                          state: {
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
                        item.author &&
                        item.author.map((author, key) => (
                          <div key={key}>
                            <p style={bodyStyle}>{author.author_name}</p>
                          </div>
                        ))}
                    </TableCell>
                    <TableCell>
                      <p style={bodyStyle}>{item.year}</p>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </TblContainer>
        )}
      </div>
    );
  };

  const ViewBook = () => {
    return (
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "calc(30px + 0.5vw)",
              fontWeight: "900",
              margin: 0,
            }}
          >
            Books
          </p>
          <button
            className="gotoBookClass"
            style={{
              float: "right",
              fontSize: "calc(14px + 0.2vw)",
              color: "black",
              borderRadius: "2px",
              padding: "10px 30px",
              transition: "0.2s",
              border: "none",
              background: "none",
            }}
            onClick={() => (window.location = "/browse-special-problems")}
          >
            Browse SP and Theses
            <i class="fa ml-2 fa-chevron-right"></i>
            <i class="fa fa-chevron-right"></i>
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
        {loader ? (
          <div
            style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}
          >
            <PropagateLoader
              color={"#0067a1"}
              speedMultiplier={2}
              loading={loader}
              size={20}
            />
          </div>
        ) : (
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
              {resourceList &&
                resourceList.map((item) => (
                  <TableRow key={item && item.bookId}>
                    <TableCell>
                      <Link
                        to={{
                          pathname: `/book/${item.bookId}`,
                          state: {
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
        )}
      </div>
    );
  };

  return (
    <div
      className="viewitem-container"
      style={{ padding: "5vw 3vw", minHeight: "90vh" }}
    >
      {type === "book" ? <ViewBook /> : <ViewSPThesis />}
    </div>
  );
}

const captionStyle = {
  fontSize: "calc(10px + 0.2vw)",
};

const bodyStyle = {
  fontSize: "calc(10px + 0.2vw)",
};
