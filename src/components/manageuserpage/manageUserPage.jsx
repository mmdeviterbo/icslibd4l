import React, { useEffect } from "react";
import FilterMenu from "./filterMenu";
import { useHistory } from "react-router";
import UserTable from "./userTable";
// import UserSearch from "./userSearch";
import ManagementHeader from "../managementHeader";

import "../../styles/manageUserStyle.css";

export default function ManageUserPage({ user }) {
    const history = useHistory();
    return (
        <>
            {!user || (user && user.userType !== 1) ? (
                history.push("/home")
            ) : (
                <div className="manage-user-container">
                    {/* <UserSearch /> */}
                    <ManagementHeader type={"user"} />
                    <FilterMenu />
                    <div className="usertable-container" style={{}}>
                        <UserTable user={user} />
                    </div>
                </div>
            )}
        </>
    );
}
