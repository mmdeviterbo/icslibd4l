import React from 'react';
import FilterButton from './filterButton'

export default function FilterMenu() { 
  const classificationList = ["Staff/Admin","Faculty","Student"]

  const filterContainer = {
    border: "3px solid grey",
    display: 'flex',
  }

  const filterButtonContainer = {
    border: "3px solid black",
    padding: "10px"
  }

  return (
    <div className="filtermenu-container inline" style={filterContainer}>

      <div className="filterButton-container" >
        <div style={filterButtonContainer}>
          <FilterButton filterBy="Classification" filterList={classificationList} />
        </div>
        <div style={filterButtonContainer}>
          <FilterButton filterBy="Classification" filterList={classificationList} />
        </div>
      </div>

      <div className="clearfilter-conatiner" style={{border: "2px solid black"}}>
        <i className="fa fa-times-circle"></i>
        <span>Clear Filter(s)</span>
      </div>

    </div>
  )
}