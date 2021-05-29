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
        label: "Title",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbarTitle: "searchbar"
            }
        ]
    },
    {
        label: "Subject",
        link: "/subject",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "CMSC128",
                link: "/subject/CMSC128",
            },
            {
                label: "CMSC123",
                link: "/subject/CMSC123",
            },
            {
                label: "STAT101",
                link: "/subject/STAT101",
            },
            {
                label: "MORE",
                iconClosed: <FaIcons.FaAngleDown/>,
                iconOpened: <FaIcons.FaAngleUp/>,
                link: "/",
                moreSubNav: [
                    {
                        mlabel: "MATH27"
                    },
                    {
                        mlabel: "CMSC56"
                    },
                    {
                        mlabel: "CMSC57"
                    }
                    
                ]
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
        label: "Type",
        link: "/type",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                label: "Book",
                link: "/type/books",
            },
            {
                label: "Special Project",
                link: "/type/sp",
            },
            {
                label: "Thesis",
                link: "/type/thesis",
            }
        ]                 
    },
    {
        label: "Year",
        link: "/year",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {    
                searchbarYear: "searchbar"
            },
        ]
    },

]