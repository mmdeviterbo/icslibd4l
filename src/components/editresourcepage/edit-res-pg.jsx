import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './add-resource-style.css';
import AddResSidebar from '../addresourcepage/sidebar-add-res';
import AddNewSPThesisForm from '../addresourcepage/add-new-spt-pg';
import { useEffect } from 'react';

const AddSPThesisPage = (props) => {
    const [infoResource, setInfoResource] = useState();

    function filterData(){
        
    }
    
    useEffect(()=>{
        console.log("edit res pg : line 10");
        console.log(props.location.state);
    },[])
    
    return(
        <div className = "add-resource-page-container" >
            <AddResSidebar/>
            <AddNewSPThesisForm/>
        </div>
    )
}

export default AddSPThesisPage