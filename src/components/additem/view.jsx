import { useState, useEffect } from 'react';
import React from 'react';
import {apiEndpoint} from '../../config.json';
import http from '../../services/httpService';
import ResourceService from '../../services/resourceService';

export default function ViewResource() {
    const [spThesisList, setSpThesisList] = useState([])
    console.log(ResourceService.viewResource())
    
    // useEffect(() => {
    //     // console.log(ResourceService.viewResource.data)
    //     // ResourceService.viewResource.then((response) => {
    //     //   setSpThesisList(response.data)
    //     // })
    //   }, [])

    return (
        <div className="viewitem-container">
            <h1>Sp/Thesis</h1>
            {spThesisList.map((val, key) => {
                return <div>
                    {val.type}, {val.title}, {val.author}, {val.year}
                </div>
            })}            
        </div>
    );
}