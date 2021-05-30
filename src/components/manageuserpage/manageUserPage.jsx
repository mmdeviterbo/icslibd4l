import React, { useEffect } from 'react'
import FilterMenu from './filterMenu'
import UserTable from './userTable'
import UserSearch from './userSearch'
import { useHistory } from 'react-router'

export default function ManageUserPage({user}) {
  const history = useHistory();

  useEffect(() => {
    if (user && user.userType !== 1){
      history.push("/not-found");
    }
  })

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