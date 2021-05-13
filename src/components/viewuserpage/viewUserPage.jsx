import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../manageuserpage/userTable";
import { useHistory } from "react-router-dom";
import ProfileContainer from "./profileContainer";

// dummy data
const tableEntry = [
  {
    userID: "0001",
    name: "Elcid X. Cruzado",
    classification: "Student",
  },
  {
    userID: "0002",
    name: "John Mel Ramos",
    classification: "Student",
  },
  {
    userID: "0003",
    name: "Rita Isabel C. Federer",
    classification: "Faculty",
  },
  {
    userID: "0004",
    name: "Joayma H. Mufasa",
    classification: "Student",
  },
  {
    userID: "0005",
    name: "Olivia Alexis C. Aranas",
    classification: "Student",
  },
  {
    userID: "0006",
    name: "Maria Franchette Beatrix F. Gacad",
    classification: "Student",
  },
  {
    userID: "0007",
    name: "Josesito Joseph T. Batumbakal III",
    classification: "Student",
  },
];

export default function ViewUserPage(props) {
  const [selectedUser, setSelectedUser] = useState({
    userID: "",
    name: "",
    classification: "",
  });

  const { users } = useContext(GlobalContext);
  const history = useHistory();

  const currentUserId = props.match.params.userID;

  useEffect(() => {
    const userID = currentUserId;
    const selectedUser = users[0].find((user) => user.userID === userID);
    console.log(props.location.state);
    setSelectedUser(selectedUser);
  }, [currentUserId, users]);

  return (
    <>
      <div className="view-user-info-container">
        {selectedUser === undefined ? (
          history.push("/not-found")
        ) : (
          <ProfileContainer />
        )}
      </div>
    </>
  );
}
