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
    height: "30px",

}