import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import ProfileContainer from "./profileContainer";
import { jwtPrivateKey } from "./../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";
import PersonService from '../../services/personService';
import LoginModal from '../modal/loginModal';

export default function ViewUserPage({user}) {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            try{
                const user = PersonService.decryptToken(localStorage.getItem(jwtPrivateKey));
            }catch(err){
                setIsLogin(true);
            }
        },300);
    },[])

    return (
        <>
            {user?
                (<div
                    className="view-user-info-container"
                    style={{ minHeight: "90vh" }}>
                    <ProfileContainer />
                </div>)
                :
                (<div style={{minHeight:"80vh",display:"grid", placeItems:"center"}}>
                    <PropagateLoader color={'#0067a1'} speedMultiplier={2} loading={true} size={20} />
                    {isLogin && <LoginModal/>}
                </div>)
            }
        </>
    );
}
