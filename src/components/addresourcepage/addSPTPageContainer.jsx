import React from "react";
import { useHistory } from "react-router";
import AddResourcesHeader from "./addResourcesHeader";
import AddNewSPThesisForm from "./addNewSPTPage";
import PersonService from '../../services/personService';
import { jwtPrivateKey } from "../../config.json";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../styles/addresource/addResourceStyle.css";

const AddSPThesisPage = ({user}) => {
    const history = useHistory();

    const accessPrivilege = () => {
        setTimeout(() => {
            try {
                const user = PersonService.decryptToken(
                    localStorage.getItem(jwtPrivateKey)
                );
                if (!user || (user && user.userType !== 1))
                    return history.push("/unauthorized");
            } catch (err) {
                return history.push("/unauthorized");
            }
        }, 700);
    };    

    return (
        <>
        {user && user.userType === 1 ? 
            <div className="add-resource-page-container">
                <AddResourcesHeader/>
                <AddNewSPThesisForm />
            </div>
             : 
             <div style={{ minHeight: "80vh", display: "grid", placeItems: "center"}}>
                <PropagateLoader color={"#0067a1"} speedMultiplier={2} loading={true} size={20}/>
                {accessPrivilege()}
            </div>
        }
        </>
    );
};

export default AddSPThesisPage;
