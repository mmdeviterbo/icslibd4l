import React, { useEffect } from "react";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import { useHistory } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

import ManagementHeader from "../managementHeader";
import ActivityTable from "./activityTable";
import searchBg from "../../assets/searchBg_4.png";

import "../../styles/activityLogsStyle.css";

export default function ActivityLogsContainer({ user }) {
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
                <div className="activity-logs-container">
                    <img src={searchBg} style={searchBgStyle} alt="#" />
                    <ManagementHeader type={"logs"} />
                    <br />
                    {/* <ActivityFilterContainer /> */}
                    <div className="activitytable-container">
                        <ActivityTable />
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

const searchBgStyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    transform: "scaleY(-1.5)",
};
