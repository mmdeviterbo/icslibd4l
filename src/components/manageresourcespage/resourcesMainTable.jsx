import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import resourceService from "../../services/resourceService";
// import MessagePopUpCont from "../messageModalContainer";
import dateFormat from "dateformat";
import PropagateLoader from "react-spinners/PropagateLoader";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const resHeadCells = [
  { id: "resid", numeric: false, disablePadding: true, label: "Resource ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "author", numeric: false, disablePadding: false, label: "Author" },
  {
    id: "resclassif",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  // {
  //   id: "relatedcourses",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Related Courses",
  // },
  {
    id: "pubyr",
    numeric: true,
    disablePadding: false,
    label: "Publishing Year",
  },
  {},
];

function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {resHeadCells.map((headCell, index) => (
          <TableCell
            style={{
              backgroundColor: "#0067a1",
              color: "white",
            }}
            className={classes.tablecell}
            key={index}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label === "Title" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              <span>{headCell.label}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow: "4px 4px 20px #cfcfcf",
    // boxShadow: "2px 5px 16px #cfcfcf",
    borderRadius: "10px",
  },
  mainTable: {
    borderRadius: "10px",
  },
  tablecell: {
    padding: "16px",
    fontSize: "1.4rem",
    fontWeight: "bold",
    // borderRadius: "10px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

// Main function
const MainResourceTable = ({ searchInput, year, restype }) => {
  const location = useLocation();
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("resid");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEdit, setSelectedEdit] = useState();
  const [resourceList, setResourceList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const searchResource = React.useCallback(async () => {
    const objFilters = year ? { year: year } : {};
    const resourceType =
      restype === "Book"
        ? "book"
        : restype === "Thesis"
        ? "thesis"
        : restype === "Special Problem"
        ? "sp"
        : "any";
    const { data } = await resourceService.searchSpThesis(
      objFilters,
      `/search?type=${resourceType}&search=${searchInput}`
    );

    setResourceList(data);
    setSelectedEdit(data);
  }, [searchInput, restype, year]);

  const fetchBooks = React.useCallback(async () => {
    let books, spThesis;
    try {
      var arr = [];
      books = await resourceService.browseResources({
        type: "book",
      });
      spThesis = await resourceService.browseResources({
        type: "thesis",
      });

      // Filters according to the type of resource
      if (restype === "Book") {
        arr = books.data;
      } else if (restype === "Special Problem" || restype === "Thesis") {
        arr = spThesis.data.filter((resource) => resource.type === restype);
      } else if (!searchInput) {
        arr = books.data && books.data.concat(spThesis.data && spThesis.data);
      }
      setResourceList(arr);
      setSelectedEdit(arr);
      setIsLoading(false);
    } catch (error) {}
  }, [restype, searchInput]);

  useEffect(() => {
    if (searchInput) {
      searchResource();
    } else {
      fetchBooks();
    }
  }, [searchInput, searchResource, fetchBooks]);
  const DeleteBtn = ({ id, title, type }) => {
    return (
      <Link
        to={{
          pathname: "/manage-resources/delete-sp-thesis",
          state: {
            background: location,
            resid: id,
            item: "resource",
            restitle: title,
            type: type,
          },
        }}
      >
        <i
          className="table-icons fa fa-trash-o"
          style={{
            margin: "10px",
            color: "red",
          }}
        ></i>
      </Link>
    );
  };

  const EditSPTBtn = (id) => {
    return (
      <Link
        to={{
          pathname: `/edit-spt/${id.id}`,
          state: { sourceInfo: selectedEdit, id },
        }}
      >
        <i
          className="table-icons fa fa-pencil"
          style={{
            margin: "10px",
            color: "gray",
          }}
        ></i>
      </Link>
    );
  };

  const EditBookBtn = (id) => {
    return (
      <Link
        to={{
          pathname: `/edit-book/${id.id}`,
          state: { sourceInfo: selectedEdit, id },
        }}
      >
        <i
          className="table-icons fa fa-pencil"
          style={{
            margin: "10px",
            color: "gray",
          }}
        ></i>
      </Link>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = resourceList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, resourceList.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.mainTable}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={resourceList.length}
            />

            {(searchInput || year !== 0 || restype) &&
            resourceList.length === 0 ? (
              <TableBody>
                <TableRow
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: 54 * 7,
                  }}
                >
                  <TableCell colSpan="6">
                    <div
                      style={{
                        padding: "5rem",
                        textAlign: "center",
                      }}
                    >
                      {isLoading ? (
                        <PropagateLoader
                          color={"#0067a1"}
                          speedMultiplier={2}
                          loading={true}
                          size={20}
                        />
                      ) : (
                        <h1>
                          Your search/filter returned no results. Please check
                          your spelling and try again, or remove applied filter.
                        </h1>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : resourceList.length === 0 ? (
              <TableBody>
                <TableRow
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: 54 * 8,
                  }}
                >
                  <TableCell colSpan="5">
                    <div
                      style={{
                        padding: "5rem",
                        textAlign: "center",
                      }}
                    >
                      {isLoading ? (
                        <PropagateLoader
                          color={"#0067a1"}
                          speedMultiplier={2}
                          loading={true}
                          size={20}
                        />
                      ) : (
                        <h1>
                          Failed to fetch data from database. Please check if
                          the database is running or please try again later.
                        </h1>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {stableSort(resourceList, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const sptClick = `/sp-thesis/${row.sp_thesis_id}`;
                    const bookClick = `/book/${row.bookId}`;
                    const viewAllBook = `/search?type=book&search=`;
                    const viewAllSP = `/search?type=sp&search=`;
                    const viewAllThesis = `/search?type=thesis&search=`;
                    const viewAllPath =
                      (row?.bookId && viewAllBook) ||
                      (row?.type === "Thesis" ? viewAllThesis : viewAllSP);

                    return (
                      <TableRow
                        className={classes.tablecell}
                        hover
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        {/* {row} */}

                        <TableCell
                          style={{
                            width: "15%",
                          }}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className={`${classes.tablecell} tableRowStyle`}
                          onClick={() =>
                            history.push(
                              (row.sp_thesis_id && sptClick) ||
                                (bookClick && bookClick)
                            )
                          }
                        >
                          {/* unique id */}
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "normal",
                            }}
                          >
                            {row && row.bookId
                              ? row && row.ISBN
                              : row && row.sp_thesis_id}
                            {/* {row.id} */}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "30%",
                          }}
                          className={`${classes.tablecell} tableRowStyle`}
                          onClick={() =>
                            history.push(
                              (row.sp_thesis_id && sptClick) ||
                                (bookClick && bookClick)
                            )
                          }
                          align="left"
                        >
                          {/* title of resources */}
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "normal",
                            }}
                          >
                            {row && row.title}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "20%",
                          }}
                          className={`${classes.tablecell} tableRowStyle`}
                          onClick={() =>
                            history.push(
                              (row.sp_thesis_id && sptClick) ||
                                (bookClick && bookClick)
                            )
                          }
                          align="left"
                        >
                          {/* author */}
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "normal",
                            }}
                          >
                            {row && row.bookId
                              ? row.author &&
                                row.author.map((item, key) => (
                                  <div key={key}>{item.author_name}</div>
                                ))
                              : row.authors &&
                                row.authors.map((item, key) => (
                                  <div key={key}>{item.author_name}</div>
                                ))}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "12%",
                          }}
                          className={`${classes.tablecell} tableRowStyle`}
                          align="left"
                        >
                          {/* classifcation */}
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "normal",
                            }}
                            onClick={() => history.push(viewAllPath)}
                          >
                            {/* Checks if a resource is a book by using the bookId attribute as checker */}
                            {row && row.bookId ? "Book" : row && row.type}
                          </div>
                        </TableCell>

                        <TableCell
                          style={{
                            width: "13%",
                          }}
                          className={classes.tablecell}
                          align="left"
                        >
                          {/* publishing year */}
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "normal",
                            }}
                          >
                            {row && row.bookId
                              ? dateFormat(row.dateAcquired, "mmmm yyyy")
                              : row && row.year}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            width: "10%",
                            textAlign: "center",
                            fontSize: "1.5rem",
                          }}
                        >
                          {row.bookId ? (
                            <EditBookBtn id={row.bookId} />
                          ) : (
                            <EditSPTBtn id={row.sp_thesis_id} />
                          )}
                          {row && row.bookId ? (
                            <DeleteBtn
                              id={row.bookId}
                              title={row.title}
                              type={"book"}
                            />
                          ) : (
                            <DeleteBtn
                              id={row.sp_thesis_id}
                              title={row.title}
                              type={row.type}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={resourceList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
};

export default MainResourceTable;
