import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default function FilterButton({filterBy, filterList}) {

  const drpdownItem = filterList.map((item, index) => (
    <Dropdown.Item key={index}>{item}</Dropdown.Item>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle variant="sucess" id="dropdown-basic">
        {filterBy}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {drpdownItem}
      </Dropdown.Menu>
    </Dropdown>
  )
}