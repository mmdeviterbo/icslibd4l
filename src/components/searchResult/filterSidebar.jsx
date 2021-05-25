<<<<<<< HEAD
import React from 'react'
// import styled from 'styled-components'
// import {Link} from 'react-router-dom'
import {FilterSidebarData} from './filterSidebarData'
import FilterSubMenu from './filterSubMenu'

export default function FilterSidebar(){
    return (
        <div>
            <nav style={sidebarNav}>
                <div style={wrapper}>
                    {FilterSidebarData.map((item, index) => {
                        return <FilterSubMenu item= {item} key={index}/>
                    })}
                </div>
            </nav>
        </div>
    )
}

const sidebarNav = {
    background: "white",
    display: "flex",
    height: "75vh",
    width: "250px",
    marginLeft:"auto",
    marginRight:"2vw",
    overflowY: "scroll",
    MsOverflowStyle:"none",
}

const wrapper = {
    width: "100%"
=======
import React from 'react'
import {FilterSidebarData} from './filterSidebarData'
import FilterSubMenu from './filterSubMenu'

export default function FilterSidebar({ searchFilterAuthor,
                                        setSearchFilterAuthor,
                                        searchFilterAdviser,
                                        setSearchFilterAdviser,
                                        filterTag, 
                                        setFilterTag}){
    return (
        <div>
            <nav style={sidebarNav}>
                <div style={wrapper}>
                    <p style={sidebarTitle}>Filters</p>
                    {FilterSidebarData.map((item, index) => {
                        return <FilterSubMenu 
                        item= {item} 
                        key={index}
                        searchFilterAuthor={searchFilterAuthor} 
                        setSearchFilterAuthor={setSearchFilterAuthor}
                        searchFilterAdviser={searchFilterAdviser} 
                        setSearchFilterAdviser={setSearchFilterAdviser}
                        filterTag={filterTag}
                        setFilterTag={setFilterTag}
                        />
                    })}
                </div>
            </nav>
        </div>
    )
}

const sidebarNav = {
    background: "white",
    display: "flex",
    height: "auto",
    width: "19vw",
    marginLeft:"auto",
    marginRight:"0.75vw",
    paddingBottom:"2vw",
    MsOverflowStyle:"none"
}

const sidebarTitle = {
    margin:"1vw 0 1vw 1.5vw",
    fontSize:"1.5em",
    fontWeight:"800",
    fontFamily:"Trebuchet MS"
}

const wrapper = {
    width: "100%"
>>>>>>> a0b5063ab401ce4ac3fe318e93aee75a547a07bd
}