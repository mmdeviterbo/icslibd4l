import React from "react";
import "../../styles/activityLogsStyle.css";

export default function ClearLogs() {
    return (
        <div className="clear-container">
            <a href="/clear-logs">
                <button className="clear-logs-btn">
                    <span className="clear-btn-txt">Clear Logs</span>
                </button>
            </a>
        </div>
    );
}
