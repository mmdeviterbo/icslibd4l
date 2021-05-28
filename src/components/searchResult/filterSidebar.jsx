import React from 'react'
import {FilterSidebarData} from './filterSidebarData'
import FilterSubMenu from './filterSubMenu'

export default function FilterSidebar({ searchFilterAuthor,
                                        setSearchFilterAuthor,
                                        searchFilterAdviser,
                                        setSearchFilterAdviser,
                                        searchFilterTitle,
                                        setSearchFilterTitle,
                                        searchFilterYear,
                                        setSearchFilterYear,
                                        filterArray,
                                        setfilterArray,
                                        fieldArray,
                                        setfieldArray
                                    }){
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
                        searchFilterTitle={searchFilterTitle}
                        setSearchFilterTitle={setSearchFilterTitle}
                        searchFilterYear={searchFilterYear}
                        setSearchFilterYear={setSearchFilterYear} 
                        filterArray={filterArray}
                        setfilterArray={setfilterArray}
                        fieldArray={fieldArray}
                        setfieldArray={setfieldArray}
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
}