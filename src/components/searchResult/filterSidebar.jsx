import React from "react";
import { FilterSidebarData } from "./filterSidebarData";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import "../../styles/searchResultStyle/advancedSearch.css";
import FilterSubMenu from "./filterSubMenu";

export default function FilterSidebar({
    searchFilterAuthor,
    setSearchFilterAuthor,
    searchFilterAdviser,
    setSearchFilterAdviser,
    resourceType,
    setResourceType,
    searchFilterYear,
    setSearchFilterYear,
    searchFilterPublisher,
    setSearchFilterPublisher,
    filterArray,
    setfilterArray,
    fieldArray,
    setfieldArray,
}) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const handleChange = (event) => {
        setResourceType(event.target.value);
    };

    return (
        <div>
            <nav style={sidebarNav}>
                <div style={wrapper}>
                    <p style={sidebarTitle}>Filters</p>
                    {FilterSidebarData.map((item, index) => {
                        return (
                            <FilterSubMenu
                                item={item}
                                key={index}
                                searchFilterAuthor={searchFilterAuthor}
                                setSearchFilterAuthor={setSearchFilterAuthor}
                                searchFilterAdviser={searchFilterAdviser}
                                setSearchFilterAdviser={setSearchFilterAdviser}
                                searchFilterPublisher={searchFilterPublisher}
                                setSearchFilterPublisher={setSearchFilterPublisher}
                                filterArray={filterArray}
                                setfilterArray={setfilterArray}
                                fieldArray={fieldArray}
                                setfieldArray={setfieldArray}
                            />
                        );
                    })}
                    {/* TYPE filter */}
                    <span style={sidebarLink} className="sidebarLink">
                        <span style={sidebarLabel}>Type</span>
                    </span>
                    <FormControl
                        className={classes.formControl}
                        style={{ marginLeft: "4.5rem", top: "-1.5vw" }}
                    >
                        <Select
                            value={resourceType}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Resource Type" }}
                        >
                            <MenuItem style={menuItems} value={resourceType}>
                                <em>{resourceType}</em>
                            </MenuItem>
                            <MenuItem style={menuItems} value="any">Any</MenuItem>
                            <MenuItem style={menuItems} value="books">Books</MenuItem>
                            <MenuItem style={menuItems} value="special problem">Special Problem</MenuItem>
                            <MenuItem style={menuItems} value="thesis">Thesis</MenuItem>
                        </Select>
                    </FormControl>

                    <span style={sidebarLink} className="sidebarLink">
                        <span style={sidebarLabel}>Year</span>
                    </span>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div style={{ marginLeft: "4.5rem" }} className="picker">
                            <DatePicker
                                selected={searchFilterYear}
                                value={searchFilterYear}
                                views={["year"]}
                                onChange={(date) => setSearchFilterYear(date)}
                                animateYearScrolling
                                placeholder={"Year"}
                                
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                </div>
            </nav>
        </div>
    );
}

const sidebarNav = {
    background: "white",
    display: "flex",
    height: "auto",
    width: "19vw",
    marginLeft: "auto",
    marginRight: "0.75vw",
    paddingBottom: "2vw",
    MsOverflowStyle: "none",
};

const sidebarTitle = {
    margin: "1vw 0 1vw 1.5vw",
    fontSize: "1.5em",
    fontWeight: "800",
    fontFamily: "Trebuchet MS",
};

const menuItems = {
    // margin: "1vw 0 1vw 1.5vw",
    fontSize: "1em",
    fontWeight: "800",
    fontFamily: "Trebuchet MS",
};

const sidebarLink = {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1.5vw 0 0",
    marginLeft: "2vw",
    marginTop: "1vw",
    listStyle: "none",
    height: "3vw",
    fontSize: "1.1em",
    fontWeight: "600",
};

const sidebarLabel = {
    marginLeft: "1.10vw",
};

const wrapper = {
    width: "100%",
};

// for classes of Select
