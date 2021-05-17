import React from 'react'
import FilterMenu from './filterMenu'
import UserTable from './userTable'
import UserSearch from './userSearch'

export default function ManageUserPage({user}) {

  return (
    <div className="manageuser-container">
      <UserSearch />
      <FilterMenu />
      <div className="usertable-container" style={{padding: '50px', backgroundColor: '#F5F5F5'}}>
        <UserTable user={user}/>
      </div>
    </div>
  )
}