<<<<<<< HEAD
import React, {useState} from 'react'
// import {Link} from 'react-router-dom'
// import styled from 'styled-components'

export default function FilterSubMenu({item}){
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    const handleFilter = (data) => {
        let filter = data.label ?  data.label : null; 
        return filter;
    }

    return (
        <div>
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
                            {item.searchbar
                            ? item.searchbar
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

=======
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
>>>>>>> a0b5063ab401ce4ac3fe318e93aee75a547a07bd
}