import React from 'react';
import FilterButton from './filterButton'

export default function FilterMenu() { 
  const classificationList = ["Staff/Admin","Faculty","Student"]

  const filterContainer = {
    display: "flex",
    flexDirection: 'row',
    margin: '30px 50px 30px 50px',
  }

  const filterButtonContainer = {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'start',
    zIndex: "-1"

  }

  const clearFilterContainer = {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }

  return (
    <div className="filtermenu-container" style={filterContainer}>

      <div className="filterButton-container" style={filterButtonContainer} >
        <FilterButton filterBy="Classification" filterList={classificationList} />
      </div>

      <div className="clearfilter-conatiner" style={clearFilterContainer}>
        <div className="clearfilter-button">
          <i className="fa fa-times-circle"></i>
          <span> Clear Filter(s)</span>
        </div>
      </div>

    </div>
  )
}