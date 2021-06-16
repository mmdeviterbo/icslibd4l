import React, { useState } from "react";
import FilterMenu from "./filterMenu";
import { useHistory } from "react-router";
import UserTable from "./userTable";
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from "../../services/personService";
import ManagementHeader from "./../managementHeader";

import { jwtPrivateKey } from "../../config.json";
import "../../styles/manageUserStyle.css";

/****************************************************************************
 * Type: Functional Component
 *
 * Summary:
 * React Component containing the main container of the manageUserPage
 *
 * Props:
 * user - currently logged in user
 ****************************************************************************/
export default function ManageUserPage({ user }) {
    const history = useHistory();
    const [selection, setSelection] = useState(-1);
    const [searchField, setSearchField] = useState("");
    const [searchInput, setSearchInput] = useState(searchField);
    /*
     * Note: What's the difference between searchInput and searchField?
     * The variable searchInput is the variable that displays what is currently typed in the search bar.
     * Without this variable, we will not be able to input any values in the search field.
     * The searchField variable on the other hand is what is used to filter the database.
     * The value of searchField will depend on whatever value is in searchField and will only be set if the user
     * pressed enter key or pressed the search icon.
     */

    /****************************************************************************
     * Type: Function
     *
     * Summary:
     * Checks if the currently logged in user is authorized to access
     * summary report page.
     ****************************************************************************/
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

    /****************************************************************************
     * Type: Function
     *
     * Summary:
     * On keypress enter, sets the value of searchField variable causing the
     * filtering of data according to the search input
     ****************************************************************************/
    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            setSearchField(searchInput);
        }
    };

    /****************************************************************************
     * Type: Function
     *
     * Summary:
     * On click of the search icon, sets the value of searchField variable causing the
     * filtering of data according to the search input
     ****************************************************************************/
    const handleSearchClick = (e) => {
        setSearchField(searchInput);
    };

    return (
        <>
            {user && user.userType === 1 ? (
                <div className="manage-user-container">
                    <ManagementHeader type={"user"} />
                    <div className="manage-user-header-container">
                        <div className="staff-search-bar-container">
                            <input
                                className="search-bar-temp"
                                placeholder={"Search for users search"}
                                value={searchInput}
                                onKeyDown={handleSearchEnter}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-secondary mybtnUserPage"
                                    type="button"
                                    onClick={handleSearchClick}
                                >
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <FilterMenu
                            selection={selection}
                            setSelection={setSelection}
                            setSearchField={setSearchField}
                            setSearchInput={setSearchInput}
                        />
                    </div>
                    <div className="usertable-container">
                        <UserTable
                            user={user}
                            selectedFilter={selection}
                            searchInput={searchField}
                            setSearchInput={setSearchInput}
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
