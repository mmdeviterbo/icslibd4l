import React from "react";
import ProfileContainer from "./profileContainer";

export default function ViewUserPage() {
    return (
        <>
            <div
                className="view-user-info-container"
                style={{ minHeight: "90vh" }}>
                <ProfileContainer />
            </div>
        </>
    );
}
