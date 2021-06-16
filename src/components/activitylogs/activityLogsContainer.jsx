import React from "react";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import { useHistory } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import ManagementHeader from "../managementHeader";
import ActivityTable from "./activityTable";
import "../../styles/activityLogsStyle.css";

/****************************************************
 * Type: React Functional Component
 *
 * Summary:
 * A component that renders a container for the managementHeader and activity logs table
 * The component shows a loading animation while waiting for data to be fetched
 *
 * props:
 * - user - object containing the information of the logged in user.
 *
 ******************************************************/
export default function ActivityLogsContainer({ user }) {
    const history = useHistory();

    // checks if the user is authorized to access the route
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
                <div className="activity-logs-container">
                    <ManagementHeader type={"logs"} />
                    <div className="activitytable-container">
                        <ActivityTable />
                    </div>
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
}
