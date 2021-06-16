import React from "react";
import ManagementHeader from "../managementHeader";
// import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "./../../config.json";
import { useHistory } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/manageresources/manageResourcesStyle.css";

const ManageResourcesPage = ({ user }) => {
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
                <div className="manage-resources-page-container">
                    <ManagementHeader type={"resource"} />
                    <br/>
                    {/* <FieldsContainerRes /> */}
                    {/* <ResTableContainer resourceList={resourceList} /> */}
                    <ResourceTableContainer />
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
