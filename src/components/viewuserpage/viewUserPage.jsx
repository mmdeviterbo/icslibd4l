import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from '../manageuserpage/userTable';
import { useHistory } from 'react-router-dom'

export default function ViewUserPage (props){
  const [selectedUser, setSelectedUser] = useState({
    googleId : '',
    email: '',
    fullName: '',
    userType: '',
    nickname: ''
  });

  const { users } = useContext(GlobalContext);
  const history = useHistory();

  console.log(users);
  console.log(props.match.params);
  const currentUserId = props.match.params.googleId;
  console.log(currentUserId);

  useEffect(() => {
    const googleId = (currentUserId);
    const selectedUser = users[0].find(user => user.googleId === googleId);
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