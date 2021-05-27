import React, { Component, useState, useCom } from 'react'
import Select from 'react-select'
import { ItemGroup } from 'semantic-ui-react'
import ResourceServices from '../../services/resourceService'
import AddResSidebar from './addResSidebar';
import ResourcePrimaryInfoForm from './primaryInfoForm'
import SaveResourceButton from './saveResourceButton'

const spOrTclas = [
    {value:'Special Problem', label:'Special Problem'},
    {value:'Thesis', label:'Thesis'},
];

const adviserchoices = [
    {value:['Maria Art Antonette', 'Clariño'], label: 'Clarino, Maria Art Antonette'},
    {value:['Joseph Anthony', 'Hermocilla'], label: 'Hermocilla, Joseph Anthony'},
]

const SPThesisInfoForm = () => {
        return(
            <>
                <h2><b>SP / Thesis</b></h2>
                <hr/>

                <div className = "classifSelect">
                        <br/>
                        Classification:
                        <Select id = "classifspt"
                                options = {spOrTclas}>
                        </Select>
                </div>

                    <h5 style = {{fontWeight:'normal', fontFamily:'Montserrat'}}>
                    Adviser(s):</h5>
                    
                    <div className="selectadvisers">
                        <Select id ="advsel"
                                options={adviserchoices}
                                isMulti>
                        </Select>
                    </div>

                    <br/>

                
                    <div class = "spthesisfiles">
                        <h5>Upload Abstract</h5>
                        <input type="file" class="resourcefiles" id="spthesisAbstract"/>
                    </div>
                    
                    <div class = "spthesisfiles">
                        <h5>Upload Manuscript</h5>
                        <input type="file" class="resourcefiles" id="spthesisManuscript"/>
                    </div>

                    <div class = "spthesisfiles">
                        <h5>Upload Journal</h5>
                        <input type="file" class="resourcefiles" id="spthesisJournal"/>
                    </div>

                    <div class = "spthesisfiles">
                        <h5>Upload Poster</h5>
                        <input type="file" class="resourcefiles" id="spthesisPoster"/>
                    </div>
            </>
        );
    }

const AddNewSPThesisForm = ({props}) => {
    return(
         <div className = "add-res-form-cont">

            <form id = "mainAddBookForm">
            {/* Primary  Info */}
                <div className = "res-primary-info">
                    
                    <ResourcePrimaryInfoForm/>
                    
                </div>
                
                <div className = "popupForm" id="sptForm">
                    <SPThesisInfoForm/>
                    <br/><br/>
                    <SaveResourceButton/>
                </div>
            </form>

        </div>
    )
}

export default AddNewSPThesisForm