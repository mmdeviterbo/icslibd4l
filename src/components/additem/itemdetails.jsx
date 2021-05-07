import React, { Component } from 'react';
import Select from "react-select";

const options = [
    { value: 'sp-thesis', label: 'Sp/Thesis' },
    { value: 'books', label: 'Books' },
  ]

export default function ItemDetails() {
      return(
          <Select options={options}/>
      )
}

const itemdetailsContainer = {
    backgroundColor: '#D0EBFA',
    fontFamily: 'Montserrat',
    "minHeight": "45vh",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    // alignItems:"center",
    // "filter": "brightness(1)",
}

const styles = {
  select:{
    width:500,
    // maxWidth:600
  }
}