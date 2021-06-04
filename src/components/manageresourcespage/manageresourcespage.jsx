import React, {useEffect} from "react";
import ManagementHeader from "../managementHeader";
import FieldsContainerRes from "./filterFieldsResources";
import ResourceTableContainer from "./resourceTableContainer";
import PersonService from '../../services/personService'
import { jwtPrivateKey } from "./../../config.json";
import { useHistory } from 'react-router-dom';
import "../../styles/manageresources/manageResourcesStyle.css";


const ManageResourcesPage = () => {
    const history = useHistory();
    // executes if the location is changed. (Opening modals)
    useEffect(() => {
        //if no user is logged in, redirect it to homepage  
        try{
            const jwt = localStorage.getItem(jwtPrivateKey);
            var userInfo = PersonService.decryptToken(jwt);
            if(userInfo?.userType!==1) history.push("/home");
        }catch(err){
            history.push("/home");
        }
    },[]);


    return (
        <div className="manage-resources-page-container">
            <ManagementHeader type={"resource"} />
            <FieldsContainerRes />
            {/* <ResTableContainer resourceList={resourceList} /> */}
            <ResourceTableContainer />
        </div>
    );
};

export default ManageResourcesPage;
