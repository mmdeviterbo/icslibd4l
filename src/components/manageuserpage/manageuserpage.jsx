import React from 'react'
import SearchbarPart from '../homepage/searchbarPart'
import FilterMenu from './filterMenu'
import UserTable from './userTable'
import UserSearch from './userSearch'

export default function ManageUserPage() {


  return (
    <div className="manageuser-container">
      <UserSearch />
      <FilterMenu />
      <UserTable  />
    </div>
  )
}