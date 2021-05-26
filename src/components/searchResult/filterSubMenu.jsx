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

    const showSubnav = () => setSubnav(!subnav)

    //returns the value of the clicked filter
    // const handleFilterTag = (data) => {
        
        
    // }

    const handleFilter = (data) => {
        let filter = data.label ?  data.label : null;
        
        if (!filter && data.searchbarAuthor){
            setSearchFilterAuthor(data.searchbarAuthor.value)
        }else if (!filter && data.searchbarAdviser){
            setSearchFilterAdviser(data.searchbarAdviser.value)
        }else{
            setFilterTag(filter);
        }
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
                            {item.label}
                            {item.searchbarAuthor
                            ?   <SearchBar  searchFilter={searchFilterAuthor} 
                                            setSearchFilter={setSearchFilterAuthor}
                                />
                            : null}
                            {item.searchbarAdviser
                            ? <SearchBar searchFilter={searchFilterAdviser} 
                                         setSearchFilter={setSearchFilterAdviser}/>
                            : null}
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
    marginLeft: "0.75vw"
}

const dropdownNav = {
    alignItems: "center",
    display: "flex",
    color: "0067A1",
    fontSize: "1.3em",
    marginLeft: "3rem",
    textDecoration: "none",
    height: "2.25vw",
}