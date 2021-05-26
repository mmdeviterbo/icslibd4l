import React, { useState, useContext, useEffect } from "react";
// import { GlobalContext } from "../manageuserpage/userTable";
import { useHistory } from "react-router-dom";
import ProfileContainer from "./profileContainer";

export default function ViewUserPage({ user }) {
  useEffect(() => {
    console.log(user);
  }, []);

  // from manage users (to be fixed for sprint3)
  // const { users } = useContext(GlobalContext);

  // const history = useHistory();

  // const googleId = user.googleId;
  return (
    <>
      <div className="view-user-info-container">
        <ProfileContainer user={user} />
      </div>
    </>
  );
}
