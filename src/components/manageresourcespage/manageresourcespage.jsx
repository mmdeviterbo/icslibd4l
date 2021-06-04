import React, {useEffect, useState} from "react";
import ManagementHeader from "../managementHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import PersonService from '../../services/personService'
import { jwtPrivateKey } from "./../../config.json";
import { useHistory } from 'react-router-dom';
import "../../styles/manageresources/manageResourcesStyle.css";


const ManageResourcesPage = () => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        //if no user is logged in, redirect it to homepage  
        try{
            const jwt = localStorage.getItem(jwtPrivateKey);
            var userInfo = PersonService.decryptToken(jwt);
            setUserInfo(userInfo);
        }catch(err){
            history.push("/home");
        }
    },[]);


    return (
        <>
        {userInfo?.userType!==1? <div className="manage-resources-page-container">
            <ManagementHeader type={"resource"} />
            <FieldsContainerRes />
            {/* <ResTableContainer resourceList={resourceList} /> */}
            <ResourceTableContainer />
        </div> : history.push("/home")}
        </>
    );
};

export default ManageResourcesPage;
