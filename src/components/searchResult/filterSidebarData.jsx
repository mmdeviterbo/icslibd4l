import React from 'react'
import * as FaIcons from 'react-icons/fa'
// import styled from 'styled-components'

export const FilterSidebarData = [
    {
        label: "Author",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                // searchbar: <SearchBar />
                searchbarAuth: "searchbar"
            }
        ]
    },
    {
        label: "Adviser",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                // searchbar: <SearchBar />
                searchbarAdv: "searchbar"
            }
        ]
    },
    {
        label: "Course",
        link: "/course",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "CMSC",
                link: "/course/CMSC",
            },
            {
                label: "IT",
                link: "/course/IT",
            },
            {
                label: "STAT",
                link: "/course/STAT",
            },
            {
                label: "MORE",
                link: "/",
            },
            {
                label: "123123",
                link: "/",
            }
        ]             
    },
    {
        label: "Topic",
        link: "/topic",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "Agriculture",
                link: "/course/agriculture",
            },
            {
                label: "Artificial Intelligence",
                link: "/course/ai",
            },
            {
                label: "Database",
                link: "/course/database",
            },
            {
                label: "MORE",
                link: "/",
            },
        ]                
    },
    {
        label: "Format",
        link: "/format",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "Book",
                link: "/format/books",
            },
            {
                label: "Special Project",
                link: "/format/sp",
            },
            {
                label: "Thesis",
                link: "/format/thesis",
            }
        ]                 
    },
    {
        label: "Publication Date",
        link: "/published",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "Last Month",
            },
            {
                label: "Last Semester",

            },
            {
                label: "Last Year",
            }
        ]
    },

]