import React from "react";
import ProfileContainer from "./profileContainer";

export default function ViewUserPage() {
    // from manage users (to be fixed for sprint3)
    // const { users } = useContext(GlobalContext);

    // const history = useHistory();

    // const googleId = user.googleId;
    return (
        <>
            <div className="view-user-info-container">
                <ProfileContainer />
            </div>
        </>
    );
}
