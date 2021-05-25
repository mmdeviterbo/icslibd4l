import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import React from 'react';
import {apiEndpoint} from '../../config.json';
import http from '../../services/httpService';
import ResourceService from '../../services/resourceService';
import viewTable from './viewTable'
import {TableBody, TableCell, TableRow} from '@material-ui/core'

export default function ViewResource() {
    const [spthesisList, setSpThesisList] = useState([])
    const [items, setItems] = useState()
    // const [resour, setResour ] = useState([])

    const {
        TblContainer
    } = viewTable();


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await ResourceService.browseSpThesis()
                setSpThesisList(response.data)
                console.log(spthesisList)
                // setSpThesisList(spThesis_arr)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        
    }, [])

    // temp var
    
    // const resource = Object.keys(spthesisList)
    // console.log(resource)

    // const showData = (props) => {
    //     console.log(props)
    // }

    return (
        <div className="viewitem-container">
            <h1>Sp/Thesis</h1>
            <TblContainer>
                <TableBody>
                    {
                        spthesisList.map(item =>
                            (<TableRow key={item.sp_thesis_id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.author_fname}</TableCell>
                                <TableCell>{item.author_lname}</TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </TblContainer>

            

        </div>
    );
}

