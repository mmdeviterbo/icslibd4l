import React, {useState} from "react";
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
    const [type, setType] = useState(null);

    const handleSearchEnter = (e) => {
        if (e.key === "Enter") {
            setSearchField(searchInput);
            setType(type);
        }
    };

    const handleSearchClick = (e) => {
        setSearchField(searchInput);
        setType(type);
    };

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
                <div className="manage-resources-page-container">
                    <ManagementHeader type={"resource"} />
                    <div className="manage-resource-header-container">
                        <FieldsContainerRes
                            setYear={setYear}
                            setType={setType}
                            setSearchField={setSearchField}
                            setSearchInput={setSearchInput}
                            searchInput={searchInput}
                            handleSearchEnter={handleSearchEnter}
                            handleSearchClick={handleSearchClick}
                            type={type}
                        />
                    </div>
                    <ResourceTableContainer
                        searchInput={searchField}
                        year={year}
                        restype={type}
                    />
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "90vh",
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
};

export default ManageResourcesPage;
