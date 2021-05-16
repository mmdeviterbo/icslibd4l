import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import React from 'react';
import {apiEndpoint} from '../../config.json';
import http from '../../services/httpService';
import ResourceService from '../../services/resourceService';

export default function ViewResource() {
    const [spthesisList, setSpThesisList] = useState([])
    const [items, setItems] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await ResourceService.viewResource()
                console.log(response.data)
                setSpThesisList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const resource = Object.keys(spthesisList)
    return (
        <div className="viewitem-container">
            <h1>Sp/Thesis</h1>

            <React.Fragment>
                { resource.map((i, key) => (
                    <div key={key}>
                        {spthesisList[i].map((item,ind) =>
                            <div key={ind}>
                                    {item.sp_thesis_id},
                                    {item.type},   
                                    {item.title},
                                    <Link to='./add' className="btn btn-warning">Edit</Link>
                            </div>
                        )}
                    </div>
                ))}
            </React.Fragment>
        </div>
    );
}


// http.get(apiEndpoint+'/thesis/view').then((response) => {
//     console.log(response.data)
//     setSpThesisList(response.data)
// })