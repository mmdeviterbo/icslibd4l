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
                // console.log(response.data)
                setSpThesisList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const resource = Object.keys(spthesisList)
    // console.log(resource)

    const showData = (props) => {
        console.log(props)
    }

    return (
        <div className="viewitem-container">
            <h1>Sp/Thesis</h1>

            {/* <React.Fragment>
                { resource.map((i, key) => (
                    <div key={key}>
                        {spthesisList[i].map((item,ind) =>
                            <div key={ind}>
                                    {item.sp_thesis_id},
                                    {item.type},   
                                    {item.title},
                                    <button className="btn btn-warning" onClick={() => ResourceService.deleteResource(item.sp_thesis_id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </React.Fragment> */}

            <div>
                <div>
                    { resource.map((i, key) => (
                        <div key={key}>
                            {/* {spthesisList[i].map((item,ind) =>
                                <div key={ind}>
                                        {spthesisList[i].sp_thesis_id},
                                        {item.type},   
                                        {item.title},
                                        <button className="btn btn-warning" onClick={() => ResourceService.deleteResource(item.sp_thesis_id)}>Delete</button>
                                </div>
                            )} */}
                            
                            {/* {spthesisList[i].map(res => (
                                <p key={res.title}>
                                    {res.title} : {res.author_fname} {res.author_lname} : {res.journal}
                                </p>
                            ))} */}

                            {spthesisList[i].map((sp_thesis_id) => {
                                const res = sp_thesis_id;

                                console.log(res.value)
                                // const data = [
                                //     id.sp_thesis_id
                                // ]
                                // showData(data)
                                // const dayTasks = tasks[date];
                                // return Object.keys(dayTasks).map((key) => {
                                //     const task = dayTasks[key];
                                //     return (
                                //     <li>{task.name}</li>
                                    // )
                                })
                            })}

                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}


// http.get(apiEndpoint+'/thesis/view').then((response) => {
//     console.log(response.data)
//     setSpThesisList(response.data)
// })