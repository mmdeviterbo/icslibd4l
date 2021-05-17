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
}