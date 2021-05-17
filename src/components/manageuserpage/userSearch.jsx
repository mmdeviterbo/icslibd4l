import React from 'react'

export default function UserSearch() {
  const userSearchBoxContainer = {
    "height":"20vh",
    "display":"flex",
    "placeItems":"center",
    "paddingTop":"50px"
  }

  const inputGroupContainer = {
    "padding":"0px 100px"
  }

  const manageLabel = {
    "fontSize":"36px",
    "width": '45%'
  }

  return (
    
    <div className="userSearchcontainer" style={userSearchBoxContainer}>       
      <div className="input-group" style={inputGroupContainer}>

        <input type="text" className="form-control" placeholder="Search for User"/>
        <div className="input-group-append">
          <button className="btn btn-secondary" type="button">
            <i className="fa fa-search"></i>  
          </button>
        </div>

      </div>

      <div className="manage-users-label" style={manageLabel}>
        Manage User
      </div>

    </div>
  )
}