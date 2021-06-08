import React, { useEffect } from "react";
import PersonService from "../../services/personService";
import { jwtPrivateKey } from "../../config.json";
import { useHistory } from "react-router-dom";
import ManagementHeader from "../managementHeader";
import ActivityTable from "./activityTable";
import searchBg from "../../assets/searchBg_4.png";

import "../../styles/activityLogsStyle.css";

export default function ActivityLogsContainer() {
    const history = useHistory();

    // executes if the location is changed. (Opening modals)
    useEffect(() => {
        //if no user is logged in, redirect it to homepage
        try {
            const jwt = localStorage.getItem(jwtPrivateKey);
            var userInfo = PersonService.decryptToken(jwt);
            if (userInfo?.userType !== 1) return history.push("/home");
        } catch (err) {
            return history.push("/home");
        }
    }, []);

    return (
        <div className="activity-logs-container">
            <img src={searchBg} style={searchBgStyle} alt="#" />
            <ManagementHeader type={"logs"} />
            <br />
            {/* <ActivityFilterContainer /> */}
            <div className="activitytable-container">
                <ActivityTable />
            </div>
        </div>
    );
}

const searchBgStyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    transform: "scaleY(-1.5)",
};
