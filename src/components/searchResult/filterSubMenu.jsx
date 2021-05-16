import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// import styled from 'styled-components'

export default function FilterSubMenu({item}){
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

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
                    <a style={dropdownNav} className="dropdownNav" to={item.link} key={index}>
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
    display: "flex",
    color: "black",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    listStyle: "none",
    height: "60px",
    fontSize: "18px"
}

const sidebarLabel = {
    marginLeft: "10px"
}

const dropdownNav = {
    height: "30px",
    paddingLeft: "3rem",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "blue",
    fontSize: "18px"
}