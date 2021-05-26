import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import ResourceService from "../../services/resourceService";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeletePopUpCont from "./delete-modal-container";

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
  { id: "resid", numeric: false, disablePadding: true, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "author", numeric: false, disablePadding: false, label: "Author/s" },
  {
    id: "resclassif",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "relatedcourses",
    numeric: false,
    disablePadding: false,
    label: "Adviser/s",
  },
  {
    id: "pubyr",
    numeric: true,
    disablePadding: false,
    label: "Publishing Year",
  },
  { id: "act1", numeric: false, disablePadding: false, label: " " },
  { id: "act2", numeric: false, disablePadding: false, label: " " },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {resHeadCells.map((headCell) => (
          <TableCell
            className={classes.tablecell}
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(4),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    fontSize: "2rem",
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <h3
          style={{
            fontWeight: "normal",
            fontFamily: "Montserrat",
            fontSize: "2rem",
            paddingBottom: "0.5rem",
          }}
        >
          Resources
        </h3>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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
    minWidth: 750,
  },
  tablecell: {
    fontSize: "1.5rem",
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
const MainResourceTable = ({ resourceType }) => {
  const location = useLocation();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("resid");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  // kinda works, dont's remove yet
  const DeleteBtn = (id) => {
    return (
      <Link
        to={{
          pathname: "/manage-resources/delete-sp-thesis",
          state: {
            background: location,
            id: id,
          },
        }}
      >
        <DeleteForeverIcon />
      </Link>
    );
  };

  const EditBtn = (id) => {
    return (
      <Link
        to={{
          pathname: "/edit-resource",
          state: {
            background: location,
            id: id,
          },
        }}
      >
        <MoreHorizIcon />
      </Link>
    );
  };

  const ReadResource = ({ row }) => {
    return (
      <div>
        {row.type == "book" ? (
          <Link
            to={{
              pathname: "/view-book",
              state: {
                background: location,
                resourceData: row,
              },
            }}
          >
            {row.title}
          </Link>
        ) : (
          <Link
            to={{
              pathname: "/view-sp-thesis",
              state: {
                background: location,
                resourceData: row,
              },
            }}
          >
            {row.title}
          </Link>
        )}
      </div>
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, resourceList.length - page * rowsPerPage);

  // const resource = Object.keys(resourceList);
  // console.log("here");
  // console.log(resource);
  const resource = Object.keys(resourceList);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
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
            <TableBody>
              {stableSort(resourceList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={classes.tablecell}
                      hover
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {/* {row} */}
                      <TableCell
                        padding="checkbox"
                        className={classes.tablecell}
                      ></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={classes.tablecell}
                      >
                        {row.sp_thesis_id}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left">
                        {/* <ReadResource row={row} /> */}
                        {row.title}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left">
                        {row.author.map((item, key) => (
                          <div key={key}>{item.author_name}</div>
                        ))}
                        {/* {row.authors} */}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left">
                        {row.type}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left">
                        {row.adviser.map((item, key) => (
                          <div key={key}>{item.adviser_name}</div>
                        ))}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left">
                        {row.year}
                      </TableCell>
                      {/* <TableCell> <a className = "editResourceBtn" href="#"> <MoreHorizIcon/> </a></TableCell> */}
                      <TableCell>
                        {" "}
                        <EditBtn id={row.sp_thesis_id} />{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <DeleteBtn id={row.sp_thesis_id} />{" "}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
