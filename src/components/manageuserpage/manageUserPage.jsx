import React, { useState } from "react";
import FilterMenu from "./filterMenu";
import { useHistory } from "react-router";
import UserTable from "./userTable";
// import ManagementHeader from "../managementHeader";
// import UserSearch from "./userSearch";
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import "../../styles/manageUserStyle.css";

export default function ManageUserPage({ user }) {
    const history = useHistory();
    const [selection, setSelection] = useState(-1);
    const [searchField, setSearchField] = useState("");
    const [searchInput, setSearchInput] = useState(searchField);

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

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            setSelection(-1);
            setSearchField(searchInput);
        }
    };

    const handleSearchClick = (e) => {
        setSelection(-1);
        setSearchField(searchInput);
    };

    return (
        <>
            {user && user.userType === 1 ? (
                <div className="manage-user-container">
                    <div className="manage-header-container">
                        <div className="search-bar-container">
                            <div className="staff-search-bar-container">
                                <input
                                    className="search-bar-temp"
                                    placeholder={"Search for users search"}
                                    value={searchInput}
                                    onKeyDown={handleSearchEnter}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        onClick={handleSearchClick}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h1>Manage User</h1>
                    </div>

                    <FilterMenu
                        selection={selection}
                        setSelection={setSelection}
                    />
                    <div className="usertable-container">
                        <UserTable
                            user={user}
                            selectedFilter={selection}
                            searchInput={searchField}
                        />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "80vh",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
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
