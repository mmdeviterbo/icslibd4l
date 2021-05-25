<<<<<<< HEAD
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import SearchBar from './searchBar'
// import styled from 'styled-components'

export const FilterSidebarData = [
    {
        label: "Author",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbar: <SearchBar/>
            }
        ]
    },
    {
        label: "Adviser",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbar: <SearchBar/>
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

=======
import React from 'react'
import * as FaIcons from 'react-icons/fa'

export const FilterSidebarData = [
    {
        label: "Author",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbarAuthor: "searchbar"
            }
        ]
    },
    {
        label: "Adviser",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbarAdviser: "searchbar"
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

>>>>>>> a0b5063ab401ce4ac3fe318e93aee75a547a07bd
]