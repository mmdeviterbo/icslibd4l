import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { GlobalContext } from '../manageuserpage/userTable';
import { useHistory } from 'react-router-dom'

export default function ViewUserPage(props) {
  const [ selectedUser, setSelectedUser ] = useState({
    userID: '',
    name: '',
    classification: ''
  });

  const { users } = useContext(GlobalContext);
  const history = useHistory();

  const currentUserId = props.match.params.userID;

  useEffect(() => {
    const userID = (currentUserId);
    const selectedUser = users[ 0 ].find(user => user.userID === userID);
    // console.log(props.userData);
    console.log(props.location.state);
    setSelectedUser(selectedUser)

  }, [ currentUserId, users ]);

  return (
    <>
      <div className="view-user-info-container">
        {selectedUser === undefined ? history.push('/not-found') :
          <Container className="user-info-container" style={userInfoContainer}>
            <Box className="user-info-box" style={userInfoBox}>

              <h1>Hello {props.match.params.name} </h1>

            </Box>



          </Container>
        }
      </div>
    </>
  )
}

const userInfoContainer = {
  maxWidth: "lg",
  // backgroundColor: '#cfe8fc', //temp[orary]
  height: "100vh",//temp
  border: "1px solid black"
}

const userInfoBox = {
  display: "flex",
  border: "5px #cfe8fc",
  content: "justified"

}