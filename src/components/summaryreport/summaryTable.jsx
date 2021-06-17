import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

import Merged from "../../download/Merged.pdf";
import Books from "../../download/Books.pdf";
import SpThesis from "../../download/spThesis.pdf";
import ResourceService from "../../services/resourceService";

const booksHeader = [
  { id: "bookId", label: "Book ID" },
  { id: "bookTitle", label: "Title" },
  { id: "bookAuthors", label: "Author(s)" },
  { id: "bookSubject", label: "Subject" },
  { id: "numOfCopies", label: "Copies" },
  { id: "bookAcquired", label: "Date Acquired" },
];

const spThesisHeader = [
  { id: "sptID", label: "ID" },
  { id: "sptType", label: "Type" },
  { id: "sptTitle", label: "Title" },
  { id: "sptAuthors", label: "Author(s)" },
  { id: "sptAdvisers", label: "Adviser(s)" },
];

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateFormatter = (dateString) => {
  var newDate = new Date(dateString);
  var month = monthList[newDate.getMonth()];
  var year = newDate.getFullYear();
  var day = newDate.getDay();
  var hours = newDate.getHours();
  var minutes = newDate.getMinutes();
  var meridiem = "";

  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  } else {
    meridiem = "AM";
  }

  return `${month} ${day > 9 ? day : `0${day}`} ${year} ${hours}:${
    minutes > 9 ? minutes : `0${minutes}`
  } ${meridiem}`;
};

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 * Custom react component that renders the table
 * containing the summary report of the resources
 * availble to the system
 *
 * props:
 * - resourceList - variable containing the resources
 * to be displayed in the table
 * - setResourceList - state function that updates the
 * value of resourceList
 * - resourceFilter - variable containing the value
 * of the selected filter.
 *
 ******************************************************/
function SummaryTable({ resourceFilter }) {
  const [booksList, setBooksList] = useState([]);
  const [spThesisList, setSpThesisList] = useState([]);
  const [allResource, setAllResource] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  /****************************************************************************
   * Type: React Hooks (useEffect)
   *
   * Summary:
   * Calls retrieve data function on page visit/refresh
   ****************************************************************************/
  useEffect(() => {
    retrieveData();
  }, []);

  /****************************************************************************
   * Type: Function
   *
   * Summary:
   * Retrieves the required data using resourceService.
   ****************************************************************************/
  const retrieveData = async () => {
    const books = await ResourceService.browseResources({
      type: "book",
    });

    const spThesis = await ResourceService.browseResources({
      type: "thesis",
    });

    setBooksList(books.data);
    setSpThesisList(spThesis.data);
  };

  /****************************************************************************
   * Type: React Hooks (useEffect)
   *
   * Summary:
   * Sets the allResource variable depending on the selected filter
   ****************************************************************************/
  useEffect(() => {
    setAllResource(resourceFilter === "Books" ? booksList : spThesisList);
  }, [resourceFilter, booksList, spThesisList]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allResource.length - page * rowsPerPage);

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Formats the table for Books
   ****************************************************************************/
  const BooksEntries = () => {
    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow key="book-header">
            {booksHeader.map((book, index) => (
              <TableCell
                key={`${book.id}${index}`}
                style={{
                  align: "left",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  zIndex: "0",
                  backgroundColor: "#0067a1",
                  color: "white",
                }}
              >
                <p>{book.label}</p>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allResource &&
            allResource
              .map((rsrc, index) => {
                return (
                  <TableRow hover key={rsrc.bookId}>
                    <TableCell
                      className="book-id-cell"
                      key={`${rsrc.bookId}-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.bookId}
                    </TableCell>

                    <TableCell
                      className="book-title-cell"
                      key={`${rsrc.bookId}-${rsrc.bookTitle}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.title}
                    </TableCell>

                    <TableCell className="book-author-cell">
                      {rsrc.author &&
                        rsrc.author.map((name) => (
                          <div
                            key={`${rsrc.bookId}-${name.author_name}`}
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            {name.author_name}
                          </div>
                        ))}
                    </TableCell>

                    <TableCell className="book-subject">
                      {rsrc.subject &&
                        rsrc.subject.map((sub) => (
                          <div
                            key={`${rsrc.bookId}-${sub.subject}`}
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            {sub.subject}
                          </div>
                        ))}
                    </TableCell>

                    <TableCell
                      className="book-copies-cell"
                      key={`${rsrc.bookId}${rsrc.numberOfCopies}-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.numberOfCopies}
                    </TableCell>

                    <TableCell
                      className="date-acquired-cell"
                      key={`${rsrc.bookId}-${rsrc.dateAcquired}-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {dateFormatter(rsrc.dateAcquired)}
                    </TableCell>
                  </TableRow>
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          {emptyRows > 0 && (
            <TableRow style={{ height: 40 * emptyRows }}></TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Formats the table for SpThesis
   ****************************************************************************/
  const SpThesisEntries = () => {
    return (
      <Table stickyHeader style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow key="spthesis-header">
            {spThesisHeader.map((spt, index) => (
              <TableCell
                key={`${spt.id}${index}`}
                style={{
                  align: "left",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  backgroundColor: "#0067a1",
                  color: "white",
                  zIndex: "0",
                }}
              >
                <span>{spt.label}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allResource &&
            allResource
              .map((rsrc, index) => {
                return (
                  <TableRow hover key={`${rsrc.sp_thesis_id}-row-${index}`}>
                    <TableCell
                      className="spThesis-id-cell"
                      key={`${rsrc.sp_thesis_id}-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.sp_thesis_id}
                    </TableCell>

                    <TableCell
                      className="spThesis-type-cell"
                      key={`${rsrc.sp_thesis_id}-${rsrc.type}${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.type && rsrc.type}
                    </TableCell>

                    <TableCell
                      className="spThesis-title-cell"
                      key={`${rsrc.sp_thesis_id}-${rsrc.title}${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.title}
                    </TableCell>

                    <TableCell
                      className="spThesis-author-cell"
                      key={`${rsrc.sp_thesis_id}-authors-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.authors &&
                        rsrc.authors.map((name, index) => (
                          <div
                            key={`${rsrc.sp_thesis_id}-${name.author_name}-${index}`}
                          >
                            {name.author_name}
                          </div>
                        ))}
                    </TableCell>

                    <TableCell
                      className="spThesis-adviser-cell"
                      key={`${rsrc.sp_thesis_id}-advisers-${index}`}
                      style={{ fontSize: "1rem" }}
                    >
                      {rsrc.advisers &&
                        rsrc.advisers.map((name, index) => (
                          <div
                            key={`${rsrc.sp_thesis_id}-${name.adviser_name}-${index}`}
                          >
                            {name.adviser_name}
                          </div>
                        ))}
                    </TableCell>
                  </TableRow>
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          {emptyRows > 0 && (
            <TableRow style={{ height: 40 * emptyRows }}></TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Chooses which table to rended to the screen given the filter selected
   * (default value of the filter is books)
   ****************************************************************************/
  const TableEntries = () => {
    return (
      <>{resourceFilter === "Books" ? <BooksEntries /> : <SpThesisEntries />}</>
    );
  };

  /****************************************************************************
   * Type: Functional Component
   *
   * Summary:
   * Handler function for when the user selects the next page function
   ****************************************************************************/
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="summary-table-container">
      {allResource.length === 0 ? (
        <div className="loader-container"></div>
      ) : (
        <>
          <TableContainer
            component={Paper}
            className="summary-table"
            style={{
              borderRadius: "10px",
              boxShadow: "4px 4px 20px #cfcfcf",
            }}
          >
            <TableEntries />
            <TablePagination
              className="pagination-container"
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5]}
              component="div"
              onChangePage={handlePageChange}
              page={page}
              count={allResource.length}
            />
          </TableContainer>
          <div className="download-button-container">
            <a href={Merged}>
              <button className="download-report-button">
                <i className="fa fa-download" />
                <span className="res-btn-txt">Download All</span>
              </button>
            </a>

            <a href={Books}>
              <button className="download-report-button">
                <i className="fa fa-download" />
                <span className="res-btn-txt">Download Books Only</span>
              </button>
            </a>

            <a href={SpThesis}>
              <button className="download-report-button">
                <i className="fa fa-download" />
                <span className="res-btn-txt">Download Sp/Thesis Only</span>
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default SummaryTable;
