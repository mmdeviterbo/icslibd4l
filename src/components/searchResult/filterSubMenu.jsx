import React, {useState} from 'react'
import SearchBar from './searchBar'

export default function FilterSubMenu({ item,
                                        searchFilterAuthor, 
                                        setSearchFilterAuthor,
                                        searchFilterAdviser,
                                        setSearchFilterAdviser,
                                        filterTag, 
                                        setFilterTag}){
    const [subnav, setSubnav] = useState(false)
    const [moreSubnav, setmoreSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)
    const showMoreSubnav = () => setmoreSubnav(!moreSubnav)
        
    //     if (!filter && data.searchbarAuthor){
    //         setSearchFilterAuthor(data.searchbarAuthor.value)
    //     }else if (!filter && data.searchbarAdviser){
    //         setSearchFilterAdviser(data.searchbarAdviser.value)
    //     }else{
    //         setFilterTag(filter);
    //     }
    // }

    // fixed warning for handlesearch filter
    const handleFilter = (data) => {
        let filter = data.label ?  data.label : null;
        if (filter === "MORE") {
            filter = null
        }
        setFilterTag(filter);
    }

    return (
        <div>
            {/*displays the submenu*/}
            <a style={sidebarLink} className="sidebarLink" to={item.link} onClick={item.subNav && showSubnav} >
                <div>
                    <span style={sidebarLabel}> {item.label} </span>
                </div>
                <div>
                    {item.subNav && subnav 
                    ? item.iconOpened 
                    : item.subNav 
                    ? item.iconClosed 
                    : null}
                </div>
            </a>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <a style={dropdownNav} 
                        className="dropdownNav" 
                        to={item.link} key={index} 
                        onClick={() => handleFilter(item)}
                    >
                        <span style={sidebarLabel}>

                            {/* SHOW MORE FILTERS */}
                            <div className="row">
                                <div className="column" onClick={item.moreSubNav && showMoreSubnav}>
                                    {item.label}
                                </div>
                                <div className="column" style={{alignItems:"center"}}>
                                    {item.moreSubNav && moreSubnav 
                                    ? item.iconOpened 
                                    : item.moreSubNav
                                    ? item.iconClosed
                                    : null}
                                </div>
                            </div>
                            {/* END OF SHOW MORE FILTERS */}
                            {/* {moreSubnav && item.moreSubNav.map((moreItem, mIndex) => {
                                return(
                                    <a style={dropdownNav} 
                                        className="dropdownNav" 
                                        key={mIndex} 
                                        onClick={() => handleFilter(moreItem)}
                                    >
                                        <span>
                                            {moreItem.mlabel}
                                        </span>

                                    </a>
                                )
                            })} */}

                            {/* ADD a searchbar for authors and advisers */}
                            {item.searchbarAuthor
                            ?   <SearchBar  searchFilter={searchFilterAuthor} 
                                            setSearchFilter={setSearchFilterAuthor}
                                />
                            : null}
                            {item.searchbarAdviser
                            ? <SearchBar searchFilter={searchFilterAdviser} 
                                         setSearchFilter={setSearchFilterAdviser}/>
                            : null}

                            

                            {/* <div>
                                {
                                    item.label === "MORE" && moreSubnav
                                }
                            </div> */}
                        </span>
                    </a>
                )
            })}
        </div>
    )
}

const sidebarLink = {
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1.5vw 0 0",
    marginLeft: "1vw",
    listStyle: "none",
    height: "3vw",
    fontSize: "1.1em",
    fontWeight: "600",
}

const sidebarLabel = {
    marginLeft: "0.75vw",
}

const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "0067A1",
    fontSize: "1.3em",
    marginLeft: "3rem",
    marginTop: "0.25em",
    marginBottom: "0.25em",
    textDecoration: "none",
    height: "2.25vw",
}