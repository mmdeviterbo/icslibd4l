import React, { useState } from "react";
import SearchBar from "./searchBar";

export default function FilterSubMenu({
    item,
    searchFilterAuthor,
    setSearchFilterAuthor,
    searchFilterAdviser,
    setSearchFilterAdviser,
    filterArray,
    setfilterArray,
    fieldArray,
    setfieldArray,
    searchFilterTitle,
    setSearchFilterTitle,
    searchFilterYear,
    setSearchFilterYear,
}) {
    const [subnav, setSubnav] = useState(false);
    const [moreSubnav, setmoreSubnav] = useState(false);

    // functions for opening and closing submenus
    const showSubnav = () => setSubnav(!subnav);
    const showMoreSubnav = () => setmoreSubnav(!moreSubnav);
    // const showMoreSubnav = (event) => {
    //     setmoreSubnav(!moreSubnav);
    //     event.target.style.backgroundColor = "white";
    // }

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
                                        className="column"
                                        onClick={
                                            item2.moreSubNav &&
                                            // (()=> showMoreSubnav(Event))
                                            showMoreSubnav
                                        }
                                    >
                                        {item2.label}
                                    </div>
                                    <div
                                        className="column"
                                        style={{
                                            backgroundColor: "white",
                                            width: "100px",
                                        }}
                                    >
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
                                                      <span style={moreOptionStyle}>
                                                          {moreitem2.label}
                                                      </span>
                                                  </a>
                                              );
                                          })
                                        : null}
                                </div>

                                <div style={optionRowStyle} className="row">
                                    {item.label === "Subject"
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
                                                          <span style={moreOptionStyle}>
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
                                    <SearchBar
                                        searchFilter={searchFilterAdviser}
                                        setSearchFilter={setSearchFilterAdviser}
                                    />
                                ) : null}
                                {item2.searchbarYear ? (
                                    <SearchBar
                                        searchFilter={searchFilterYear}
                                        setSearchFilter={setSearchFilterYear}
                                    />
                                ) : null}
                                {item2.searchbarTitle ? (
                                    <SearchBar
                                        searchFilter={searchFilterTitle}
                                        setSearchFilter={setSearchFilterTitle}
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
    alignItems: "center",
    paddingLeft: "2vw",//margin
    listStyle: "none",
    width:"17.5vw",
    height: "3vw",
    fontSize: "1.2em",
    fontWeight: "600",
    // justifyContent: "space-between",
    // padding: "0 1.5vw 0 0",
};

const sidebarLabel = {
    // marginLeft: "0.75vw",
};

// style for submenu
const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "rgb(0, 103, 161)",
    fontSize: "1.3em",
    paddingLeft: "3rem",//margin
    marginTop: "0.25em",
    marginBottom: "0.25em",
    textDecoration: "none",
    height: "2.25vw",
};

// style for more sub nav
const moreOptionStyle = {
    // alignItems: "center",
    // display: "flex",
    // color: "rgb(0, 103, 161)",
    // fontSize: "0.75em",
    // left: "-20px",
    // position: "relative",
    // zIndex: "1",
};

const optionRowStyle = {
    // backgroundColor: "white",
    // overflowWrap: "break-word",
    // width: "15vw",
    // zIndex: "1",
};

// const moreStyle = {
//     backgroundColor:"white",
//     width: "100px",
// };

// const arrowStyle = {
//     backgroundColor:"white",
//     width: "100px",
//     height: "5vw"
// };
