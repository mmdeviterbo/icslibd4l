import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
                {resHeadCells.map((headCell) => (
                    <TableCell
                        style={{ backgroundColor: "#FAFAFA" }}
                        className={classes.tablecell}
                        key={headCell.id}
                        align={"left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
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
        // fontSize: '2rem',
        width: "100%",
    },
    //   tblheaders:{
    //       fontSize:'1.5rem'
    //   },
    paper: {
        width: "100%",
        // fontSize: '2rem',
        marginBottom: theme.spacing(2),
    },
    table: {
        // fontSize: '2rem',
        // minWidth: 750,
    },
    tablecell: {
        padding: "16px",
        fontSize: "1.4rem",
        fontWeight: "bold",
        // color: "#FFFFFF",
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
const MainResourceTable = () => {
    const location = useLocation();
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("resid");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedEdit, setSelectedEdit] = useState();
    const [resourceList, setResourceList] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const books = await resourceService.browseResources({
                    type: "book",
                });
                const spThesis = await resourceService.browseResources({
                    type: "thesis",
                });

                let arr =
                    books.data &&
                    books.data.concat(spThesis.data && spThesis.data);
                // arr.push(books.data);
                // arr.push(spThesis.data);
                console.log(arr);
                setResourceList(arr);
                setSelectedEdit(arr);
                // setSpThesisList(spThesis_arr)
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, []);

    // useEffect(() => {
    //   async function fetchSPT() {
    //     try {
    //       const spThesis = await resourceService.browseResources({
    //         type: "thesis",
    //       });
    //       // setResourceList([]);
    //       console.log(resourceList);
    //       // setResourceList([...resourceList, spThesis.data]);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchSPT();
    // }, []);

    // console.log(selectedEdit)

    const DeleteBtn = (id) => {
        return (
            <Link
                to={{
                    pathname: "/manage-resources/delete-sp-thesis",
                    state: {
                        background: location,
                        id: id,
                        item: "resource",
                    },
                }}>
                <i
                    className="table-icons fa fa-trash-o"
                    style={{
                        margin: "10px",
                        color: "red",
                    }}></i>
            </Link>
        );
    };

    // const DeleteBookBtn = (id) => {
    //   return(
    //     <Link
    //       to = {{
    //         pathname :
    //       }}
    //   )
    // }

    const EditSPTBtn = (id) => {
        // console.log("30888 res-main-t-2");
        // console.log(id);

        return (
            <Link
                to={{
                    pathname: `/edit-spt/${id.id}`,
                    state: { sourceInfo: selectedEdit, id },
                }}>
                <i
                    className="table-icons fa fa-pencil"
                    style={{
                        margin: "10px",
                        color: "gray",
                    }}></i>
            </Link>
        );
    };

    const EditBookBtn = (id) => {
        return (
            <Link
                to={{
                    pathname: `/edit-book/${id.id}`,
                    state: { sourceInfo: selectedEdit, id },
                }}>
                <i
                    className="table-icons fa fa-pencil"
                    style={{
                        margin: "10px",
                        color: "gray",
                    }}></i>
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

    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];

    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     );
    //   }

    //   setSelected(newSelected);
    // };

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
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        aria-label="enhanced table">
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={resourceList.length}
                        />
                        <TableBody>
                            {stableSort(
                                resourceList,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            className={classes.tablecell}
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}>
                                            {/* {row} */}

                                            <TableCell
                                                style={{
                                                    width: "15%",
                                                }}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                className={classes.tablecell}>
                                                {/* unique id */}
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "normal",
                                                    }}>
                                                    {row && row.bookId
                                                        ? row && row.bookId
                                                        : row &&
                                                          row.sp_thesis_id}
                                                    {/* {row.id} */}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    width: "20%",
                                                }}
                                                className={classes.tablecell}
                                                align="left">
                                                {/* title of resources */}
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "normal",
                                                    }}>
                                                    {row && row.title}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    width: "15%",
                                                }}
                                                className={classes.tablecell}
                                                align="left">
                                                {/* author */}
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "normal",
                                                    }}>
                                                    {row.author &&
                                                        row.author.map(
                                                            (item, key) => (
                                                                <div key={key}>
                                                                    {
                                                                        item.author_name
                                                                    }
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    width: "12%",
                                                }}
                                                className={classes.tablecell}
                                                align="left">
                                                {/* classifcation */}
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "normal",
                                                    }}>
                                                    {/* Checks if a resource is a book by using the bookId attribute as checker */}
                                                    {row && row.bookId
                                                        ? "Book"
                                                        : row && row.type}
                                                </div>
                                            </TableCell>

                                            <TableCell
                                                style={{
                                                    width: "13%",
                                                }}
                                                className={classes.tablecell}
                                                align="left">
                                                {/* publishing year */}
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "normal",
                                                    }}>
                                                    {row && row.bookId
                                                        ? dateFormat(
                                                              row.dateAcquired,
                                                              "mmmm yyyy"
                                                          )
                                                        : row && row.year}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    width: "10%",
                                                    textAlign: "center",
                                                    fontSize: "1.5rem",
                                                }}>
                                                <EditBtn id={row && row.id} />
                                                <DeleteBtn id={row && row.id} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
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
