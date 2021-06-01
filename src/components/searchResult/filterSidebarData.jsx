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
        label: "Publisher",
        iconClosed: <FaIcons.FaAngleDown/>,
        iconOpened: <FaIcons.FaAngleUp/>,
        subNav: [
            {
                searchbarPublisher: "searchbar"
            }
        ]
    },
    // {
    //     label: "Courses",
    //     link: "/courses",
    //     iconClosed: <FaIcons.FaAngleDown/>,
    //     iconOpened: <FaIcons.FaAngleUp/>,
    //     subNav: [
    //         {
    //             label: "CMSC123",
    //         },
    //         {
    //             label: "CMSC127",
    //         },
    //         {
    //             label: "CMSC128",
    //         },
    //         {
    //             label: "MORE",
    //             iconClosed: <FaIcons.FaAngleRight/>,
    //             iconOpened: <FaIcons.FaAngleLeft/>,
    //             moreSubNav: [
    //                     {
    //                         mlabel: "CMSC21"
    //                     },
    //                     {
    //                         mlabel: "CMSC56"
    //                     },
    //                     {
    //                         mlabel: "CMSC57"
    //                     },
    //                     {
    //                         mlabel: "CMSC100"
    //                     },
    //                     {
    //                         mlabel: "CMSC150"
    //                     }
    //             ]
    //         },
    //     ]             
    // },
    // {
    //     label: "Topic",
    //     iconClosed: <FaIcons.FaAngleDown/>,
    //     iconOpened: <FaIcons.FaAngleUp/>,
    //     subNav: [
    //         {
    //             label: "Agriculture",

    //         },
    //         {
    //             label: "Artificial Intelligence",

    //         },
    //         {
    //             label: "Database",

    //         },
    //         {
    //             label: "MORE",
    //             iconClosed: <FaIcons.FaAngleRight/>,
    //             iconOpened: <FaIcons.FaAngleLeft/>,
    //             moreSubNav: [
    //                     {
    //                         mlabel: "Algorithms"
    //                     },
    //                     {
    //                         mlabel: "Neural Networks"
    //                     },
    //                     {
    //                         mlabel: "Robot Modeling"
    //                     },
    //                     {
    //                         mlabel: "Mobile Development"
    //                     },
    //                     {
    //                         mlabel: "Web Development"
    //                     }
    //             ]
                
    //         },
    //     ]                
    // }
    // {
    //     label: "Type",

    //     // iconClosed: <FaIcons.FaAngleDown/>,
    //     // iconOpened: <FaIcons.FaAngleUp/>,
    //     // subNav: [
    //     //     {
    //     //         label: "Book",
    //     //         value: "books"
    //     //     },
    //     //     {
    //     //         label: "Special Problem",
    //     //         value: "special problem"
    //     //     },
    //     //     {
    //     //         label: "Thesis",
    //     //         value: "thesis"
    //     //     }
    //     // ]                 
    // },
    // {
    //     label: "Year",
    // },

]