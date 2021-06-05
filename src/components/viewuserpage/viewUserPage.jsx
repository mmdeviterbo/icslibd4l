import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import ProfileContainer from "./profileContainer";
import { jwtPrivateKey } from "./../../config.json";

export default function ViewUserPage() {
    const history = useHistory();

    useEffect(() => {
        //if no user is logged in, redirect it to homepage  
        try{
            if(!localStorage.getItem(jwtPrivateKey)) history.push("/home");
        }catch(err){
            history.push("/home");
        }
    }, []);
    
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
