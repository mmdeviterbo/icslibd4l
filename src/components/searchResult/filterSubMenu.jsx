import React, { useState } from "react";
import SearchBar from "./searchBar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {AdviserData} from "./adviserData";

export default function FilterSubMenu({
    item,
    searchFilterAuthor,
    setSearchFilterAuthor,
    searchFilterAdviser,
    setSearchFilterAdviser,
    searchFilterPublisher,
    setSearchFilterPublisher,
    filterArray,
    setfilterArray,
    fieldArray,
    setfieldArray,
}) {
    const [subnav, setSubnav] = useState(false);
    const [moreSubnav, setmoreSubnav] = useState(false);

    // functions for opening and closing submenus
    const showSubnav = () => setSubnav(!subnav);
    const showMoreSubnav = () => {
        setmoreSubnav(!moreSubnav);
        let col_arr = document.getElementsByClassName("more");
        for (let i = 0; i < col_arr.length; i++) {
            if (col_arr[i].innerHTML === "MORE") {
                col_arr[i].style.backgroundColor = "white";
            }
        }
    };

    const moreTopics = [
        {
            label: "Algorithms",
        },
        {
            label: "Neural Networks",
        },
        {
            label: "Robot Modeling",
        },
        {
            label: "Mobile Development",
        },
        {
            label: "Web Development",
        },
    ];

    const moreSubjects = [
        {
            label: "CMSC21",
        },
        {
            label: "CMSC56",
        },
        {
            label: "CMSC57",
        },
        {
            label: "CMSC100",
        },
        {
            label: "CMSC150",
        },
    ];

    // fixed warning for handlesearch filter
    const handleFilter = (data, parent) => {
        let filter = data.label ? data.label : null;
        if (filter === "MORE") {
            return;
        }
        // get all selected filters
        // check if filter is already in the array
        let filterIndex = filterArray.indexOf(filter);
        let fieldIndex = fieldArray.indexOf(parent.label);

        // (SELECT FILTER)
        if (
            parent.label === "Author" ||
            parent.label === "Adviser" ||
            parent.label === "Title" ||
            parent.label === "Year"
        ) {
            return;
        }
        if (fieldIndex < 0) {
            // field and filter not in the array
            // add if filter is not in array
            setfilterArray([...filterArray, filter]);
            // add if field is not in field array
            setfieldArray([...fieldArray, parent.label]);
        } else {
            // remove from the array if clicked again (DESELECT FILTER)
            // change the filter
            filterArray.splice(filterIndex, 1);
            setfilterArray([...filterArray, filter]);
            fieldArray.splice(fieldIndex, 1);
            setfieldArray([...fieldArray, parent.label]);
        }
    };

    // const handleAdviserChange = () => {
    //     setSearchFilterAdviser({fname:adviserHolder.value.fname, lname:adviserHolder.value.lname});
    // }

    const handleAdviserChange = (newVal) => {
        setSearchFilterAdviser({fname:newVal.value.fname, lname:newVal.value.lname});
    }

    return (
        <div>
            {/*displays the submenu*/}
            <span
                style={sidebarLink}
                className="sidebarLink"
                onClick={item.subNav && showSubnav}
            >
                <div className="row">
                    <span style={sidebarLabel}> {item.label} </span>
                    <div className="column">
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                            ? item.iconClosed
                            : null}
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
                                {/* SHOW MORE FILTERS */}
                                <div className="row">
                                    <div
                                        className="more"
                                        onClick={
                                            item2.moreSubNav &&
                                            // (()=> showMoreSubnav(item2))
                                            showMoreSubnav
                                        }
                                    >
                                        {item2.label}
                                    </div>
                                    <div className="column" style={moreStyle}>
                                        {item2.moreSubNav && moreSubnav
                                            ? item2.iconOpened
                                            : item2.moreSubNav
                                            ? item2.iconClosed
                                            : null}
                                    </div>
                                </div>
                                {/* END OF SHOW MORE FILTERS */}

                                <div style={optionRowStyle} className="row">
                                    {item.label === "Topic"
                                        ? moreSubnav &&
                                          item2.moreSubNav &&
                                          moreTopics.map((moreitem2, mIndexTopic) => {
                                              return (
                                                  <a
                                                      style={dropdownNav}
                                                      className="dropdownNav"
                                                      key={mIndexTopic}
                                                      onClick={() =>
                                                          handleFilter(moreitem2, item)
                                                      }
                                                  >
                                                      <span style={moreOptions}>
                                                          {moreitem2.label}
                                                      </span>
                                                  </a>
                                              );
                                          })
                                        : null}
                                </div>

                                <div style={optionRowStyle} className="row">
                                    {item.label === "Courses"
                                        ? moreSubnav &&
                                          item2.moreSubNav &&
                                          moreSubjects.map((moreitem3, mIndexSubj) => {
                                              return (
                                                  <div key={mIndexSubj}>
                                                      <a
                                                          style={dropdownNav}
                                                          className="dropdownNav"
                                                          onClick={() =>
                                                              handleFilter(
                                                                  moreitem3,
                                                                  item
                                                              )
                                                          }
                                                      >
                                                          <span style={moreOptions}>
                                                              {moreitem3.label}
                                                          </span>
                                                      </a>
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div>

                                {/* ADD a searchbar for authors and advisers */}
                                {item2.searchbarAuthor ? (
                                    <SearchBar
                                        searchFilter={searchFilterAuthor}
                                        setSearchFilter={setSearchFilterAuthor}
                                    />
                                ) : null}
                                {item2.searchbarAdviser ? (
                                    
                                    <Autocomplete
                                        value={searchFilterAdviser}
                                        onChange={(event, newValue) => {
                                            handleAdviserChange(newValue)
                                        }}
                                        id="combo-box-adviser"
                                        options={AdviserData}
                                        getOptionLabel={(option) => option.label}
                                        style={{ width: 200, marginTop: "2vw", marginBottom: "2vw"}}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Adviser"
                                            />
                                        )}
                                    />
                                ) : null}
                                {item2.searchbarPublisher ? (
                                    <SearchBar
                                        searchFilter={searchFilterPublisher}
                                        setSearchFilter={setSearchFilterPublisher}
                                    />
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
    marginLeft: "1vw",
    marginTop: "1vw",
    listStyle: "none",
    height: "3vw",
    fontSize: "1.1em",
    fontWeight: "600",
};

const sidebarLabel = {
    marginLeft: "0.75vw",
};

// style for submenu
const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "rgb(0, 103, 161)",
    fontSize: "1.3em",
    marginLeft: "2rem",
    marginTop: "0.25em",
    marginBottom: "0.25em",
    textDecoration: "none",
    height: "2.25vw",
};

// style for more sub nav
const moreOptions = {
    alignItems: "center",
    display: "flex",
    color: "rgb(0, 103, 161)",
    fontSize: "0.75em",
    left: "-20px",
    marginLeft: "0.5rem",
    position: "relative",
    zIndex: "1",
};

const optionRowStyle = {
    backgroundColor: "white",
    overflowWrap: "break-word",
    width: "15vw",
    zIndex: "1",
};

const moreStyle = {
    backgroundColor: "white",
    width: "100px",
};
