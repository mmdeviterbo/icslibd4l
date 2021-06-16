import React, { useState } from "react";
import ManagementHeader from "../managementHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "./../../config.json";
import { useHistory } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/manageresources/manageResourcesStyle.css";
import "../../styles/managementHeaderStyle.css";

const ManageResourcesPage = ({ user }) => {
    const history = useHistory();

    // States for search
    const [searchField, setSearchField] = useState("");
    const [searchInput, setSearchInput] = useState(searchField);

    // States for filters
    const [year, setYear] = useState(0);
    const [type, setType] = useState("");

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
                <div className="manage-resources-page-container">
                    <ManagementHeader type={"resource"} />
                    <div className="manage-resource-header-container">
                        <div className="resource-search-bar-container">
                            <input
                                className="search-bar-temp"
                                placeholder={"Search for resource"}
                                value={searchInput}
                                onKeyDown={handleSearchEnter}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-secondary res-search-btn"
                                    type="button"
                                    onClick={handleSearchClick}
                                >
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        {/* <br /> */}
                        <FieldsContainerRes
                            setYear={setYear}
                            setType={setType}
                            setSearchField={setSearchField}
                            setSearchInput={setSearchInput}
                        />
                    </div>
                    {/* <ResTableContainer resourceList={resourceList} /> */}
                    <ResourceTableContainer
                        searchInput={searchField}
                        year={year}
                        restype={type}
                    />
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
};

export default ManageResourcesPage;
