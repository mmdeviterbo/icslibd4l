import React, {useState} from 'react'
import SearchBar from './searchBar'

export default function FilterSubMenu({ item, 
                                        searchFilterAuthor, 
                                        setSearchFilterAuthor,
                                        searchFilterAdv,
                                        setSearchFilterAdv,
                                        filterTag, 
                                        setFilterTag}){
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    // returns the value of the clicked filter
    const handleFilter = (data) => {
        let filter = data.label ?  data.label : null;
        if (filter == null && data.searchbarAuthor){
            setSearchFilterAuthor(data.searchbarAuth.value)
        }else if (filter == null && data.searchbarAdv){
            setSearchFilterAdv(data.searchbarAdv.value)
        }else {
            setFilterTag(filter)
        }
    }

    return (
        <div>
            {/* displays the submenu */}
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
                            {item.label}
                            {item.searchbarAuth
                            ?   <SearchBar  searchFilter={searchFilterAuthor} 
                                            setSearchFilter={setSearchFilterAuthor}
                                />
                            : null}
                            {item.searchbarAdv
                            ? <SearchBar searchFilter={searchFilterAdv} 
                                         setSearchFilter={setSearchFilterAdv}/>
                            : null}
                        </span>
                    </a>
                )
            })}
        </div>
    )
}

const sidebarLink = {
    alignItems: "center",
    color: "black",
    display: "flex",
    fontFamily: "Montserrat",
    fontSize: "18px",
    fontWeight: "600",
    justifyContent: "space-between",
    listStyle: "none",
    padding: "20px",
    height: "60px"
}

const sidebarLabel = {
    marginLeft: "10px"
}

const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "0067A1",
    fontSize: "18px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    paddingLeft: "3rem",
    textDecoration: "none",
    height: "40px",

}