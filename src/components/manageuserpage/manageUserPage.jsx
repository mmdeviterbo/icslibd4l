import React from "react";
import FilterMenu from "./filterMenu";
import { useHistory } from "react-router";
import UserTable from "./userTable";
import ManagementHeader from "../managementHeader";
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import "../../styles/manageUserStyle.css";

export default function ManageUserPage({ user }) {
    const history = useHistory();

    const accessPrivilege = () => {
        setTimeout(() => {
            try {
                const user = PersonService.decryptToken(
                    localStorage.getItem(jwtPrivateKey)
                );
                if (!user || (user && user.userType !== 1))
                    return history.push("/unauthorized");
            } catch (err) {
                return history.push("/unauthorized");
            }
        }, 700);
    };

    return (
        <>
            {user && user.userType === 1 ? (
                <div className="manage-user-container">
                    <ManagementHeader />
                    <FilterMenu />
                    <div className="usertable-container">
                        <UserTable user={user} />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "80vh",
                        display: "grid",
                        placeItems: "center",
                    }}>
                    <PropagateLoader
                        color={"#0067a1"}
                        speedMultiplier={2}
                        loading={true}
                        size={20}
                    />
                    {accessPrivilege()}
                </div>
            )}
        </>
    );
}
