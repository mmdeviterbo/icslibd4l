import { useState, useEffect } from 'react';
import React from 'react';
import {apiEndpoint} from '../../config.json';
import http from '../../services/httpService';
import ResourceService from '../../services/resourceService';

export default function ViewResource() {
    const [thesisList, setThesisList] = useState([])
    useEffect(() => {
        http.get(apiEndpoint+'/view-sp-thesis').then((response) => {
          setThesisList(response.data)
            console.log('view data,,')
        })
      }, [])

    return (
        <div className="viewitem-container">
            <h1>Sp/Thesis</h1>
            {thesisList.map((val, key) => {
                return <div>
                    {val.type}, {val.title}, {val.author}, {val.year}
                </div>
            })}            
        </div>
    );
}

const additemContainer = {
    fontFamily: 'Montserrat',
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
}

const styles = {
    select:{
        width:'100%',
        maxWidth:600
    },
}