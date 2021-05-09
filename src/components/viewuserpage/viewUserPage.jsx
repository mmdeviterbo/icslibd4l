import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from '../manageuserpage/userTable';
import { useHistory } from 'react-router-dom'

export default function ViewUserPage (props){
  const [selectedUser, setSelectedUser] = useState({
    userID: '', 
    name: '',
    classification: ''
  });

  const { users } = useContext(GlobalContext);
  const history = useHistory();

  const currentUserId = props.match.params.userID;

  useEffect(() => {
    const userID = (currentUserId);
    const selectedUser = users[0].find(user => user.userID === userID);
    setSelectedUser(selectedUser)

  }, [currentUserId, users]);

  return (
    <>
      <div className="view-user-info-container">
        {selectedUser === undefined ? history.push('/not-found') : 
          <h1>Hello User!</h1>
        }
      </div>
    </>
  )
}