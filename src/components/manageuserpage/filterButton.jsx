import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function FilterButton({filterBy, filterList}) {

  const drpdownItem = filterList.map((item, index) => (
    <Dropdown.Item key={index}>{item}</Dropdown.Item>
  ));

  const dropDownButtonStyle = {
    backgroundColor: "#FFFFFF",
    color: "#C4C4C4",
    borderColor: "#C4C4C4",
    padding: "10px",
    width: "20em",
    textAlign: "left",
    
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle style={dropDownButtonStyle} >
          {filterBy}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {drpdownItem}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}