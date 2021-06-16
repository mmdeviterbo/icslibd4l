import React from "react";
import * as FaIcons from "react-icons/fa";

/****************************************************
 * Type: React Array
 *
 * Summary:
 * Contains the labels and sublabels for nested sidebar
 * 
 ******************************************************/

export const FilterSidebarData = [
    {
        label: "Author",
        iconClosed: <FaIcons.FaAngleDown />,
        iconOpened: <FaIcons.FaAngleUp />,
        subNav: [
            {
                searchbarAuthor: "searchbar",
            },
        ],
    },
    {
        label: "Adviser",
        iconClosed: <FaIcons.FaAngleDown />,
        iconOpened: <FaIcons.FaAngleUp />,
        subNav: [
            {
                searchbarAdviser: "searchbar",
            },
        ],
    },
    {
        label: "Publisher",
        iconClosed: <FaIcons.FaAngleDown />,
        iconOpened: <FaIcons.FaAngleUp />,
        subNav: [
            {
                searchbarPublisher: "searchbar",
            },
        ],
    },
];
