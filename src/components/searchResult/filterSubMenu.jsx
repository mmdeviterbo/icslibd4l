import React, { useState } from "react";
import SearchBar from "./searchBar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AdviserData } from "./adviserData";

/***************************************************************************
 * Type: React Functional Component
 *
 * Summary:
 * Submenu for the filter sidebar
 *
 * props:
 * - <prop> = <description>
 * item = variable, contains the parent component/label of the submenu
 * searchFilterAuthor = variable, contains the value of author filter
 * setSearchFilterAuthor = function, sets the state of author filter
 * searchFilterAdviser  = variable, contains the value of adviser filter
 * setSearchFilterAdviser = function, sets the state of adviser filter
 * searchFilterPublisher  = variable, contains the value of publisher filter
 * setSearchFilterPublisher = function, sets the state of publisher filter
 * setCourse = function, sets the state of course filter
 * 
 ***************************************************************************/

export default function FilterSubMenu({
    item,
    searchFilterAuthor,
    setSearchFilterAuthor,
    searchFilterAdviser,
    setSearchFilterAdviser,
    searchFilterPublisher,
    setSearchFilterPublisher,
    setCourse,
}) {
    const [subnav, setSubnav] = useState(false);

    // functions for opening and closing submenus
    const showSubnav = () => setSubnav(!subnav);

    // fixed warning for handlesearch filter
    const handleFilter = (data, parent) => {
        let filter = data.label ? data.label : null;
        if (parent.label === "Courses") {
            setCourse(filter);
        }
    };

    const handleAdviserChange = (newVal) => {
        if (newVal !== undefined || newVal !== null) {
            setSearchFilterAdviser(newVal);
            // setSearchFilterAdviser({fname:newVal.value.fname, lname:newVal.value.lname});
        }
    };
    return (
        <div>
            {/*displays the submenu*/}
            <span
                style={sidebarLink}
                className="sidebarLink"
                onClick={item.subNav && showSubnav}
            >
                <div className="row">
                    <span style={sidebarLabel} className="column">
                        {item.label}

                    </span>
                    
                    <div style={sidebarLabel} className="column">
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                            ? item.iconClosed
                            : null
                        }
                    </div>
                </div>
            </span>

            {subnav &&
                item.subNav.map((item2, index) => {
                    return (
                        <span
                            style={dropdownNav}
                            className="dropdownNav container"
                            to={item2.link}
                            key={index}
                            onClick={() => handleFilter(item2, item)}
                        >
                            <span style={sidebarLabel}>

                                {/* searchbar for authors and advisers */}
                                {item2.searchbarAuthor ? (
                                    <SearchBar
                                        searchFilter={searchFilterAuthor}
                                        setSearchFilter={setSearchFilterAuthor}
                                    />
                                ) : null}
                                {item2.searchbarAdviser 
                                ? (
                                    <div
                                        style={{
                                            position: "relative",
                                            left: "-3.75vw",
                                        }}
                                    >
                                        <Autocomplete
                                            freeSolo
                                            id="combo-box-adviser"
                                            value={searchFilterAdviser}
                                            options={AdviserData.map(
                                                (option) => option.label
                                            )}
                                            onChange={(e, newValue) => {
                                                handleAdviserChange(newValue);
                                            }}
                                            style={{
                                                width: "12vw",
                                                marginTop: "2vw",
                                                marginBottom: "2vw",
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Adviser"/>
                                        )}
                                        />
                                    </div>
                                ) : null}
                                {item2.searchbarPublisher ? (
                                    <>
                                    <SearchBar
                                        searchFilter={searchFilterPublisher}
                                        setSearchFilter={setSearchFilterPublisher}
                                    />
                                    </>
                                ) : null}
                            </span>
                        </span>
                    );
                })}
        </div>
    );
}

// style for main menu filters
const sidebarLink = {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1.5vw 0 0",
    marginTop: "1vw",
    listStyle: "none",
    height: "3vw",
    fontSize: "1.1em",
    fontWeight: "600",
    position: "relative",
    left: "-1.5vw",
    transition:"0.3s"
};

const sidebarLabel = {
    marginLeft: "1.5vw",
    position: "relative",
    left: "1vw",
};

// style for submenu
const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "rgb(0, 103, 161)",
    fontSize: "1.3em",
    marginLeft: "1rem",
    marginTop: "0.25em",
    marginBottom: "0.25em",
    textDecoration: "none",
    height: "2.25vw",
};
