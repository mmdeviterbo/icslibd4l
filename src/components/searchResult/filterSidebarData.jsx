import React from 'react'
import * as RiIcons from 'react-icons/ri'
import SearchBar from './searchBar'
// import styled from 'styled-components'

export const FilterSidebarData = [
    {
        label: "Author",
        iconClosed: <RiIcons.RiArrowDownSLine/>,
        iconOpened: <RiIcons.RiArrowUpSLine/>,
        subNav: [
            {
                searchbar: <SearchBar/>
            }
        ]
    },
    {
        label: "Adviser",
        iconClosed: <RiIcons.RiArrowDownSLine/>,
        iconOpened: <RiIcons.RiArrowUpSLine/>,
        subNav: [
            {
                searchbar: <SearchBar/>
            }
        ]
    },
    {
        label: "Course",
        link: "/course",
        iconClosed: <RiIcons.RiArrowDownSLine/>,
        iconOpened: <RiIcons.RiArrowUpSLine/>,
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
        iconClosed: <RiIcons.RiArrowDownSLine/>,
        iconOpened: <RiIcons.RiArrowUpSLine/>,
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
        iconClosed: <RiIcons.RiArrowDownSLine/>,
        iconOpened: <RiIcons.RiArrowUpSLine/>,
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
        // add dates, search bar?
    },

]