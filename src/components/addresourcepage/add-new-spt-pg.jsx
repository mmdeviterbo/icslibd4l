import React, { Component, useState, useCom } from 'react'
import Select from 'react-select'
import { ItemGroup } from 'semantic-ui-react'
import ResourceServices from '../../services/resourceService'
import AddResSidebar from './sidebar-add-res';
import ResourcePrimaryInfoForm from './primary-info-form'
import SaveResourceButton from './save-resource-btn'

const spOrTclas = [
    {value:'sp', label:'Special Problem'},
    {value:'thesis', label:'Thesis'},
];

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
                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;First Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorFN"/>
                    </div>

                    <div class = "primaryfields">
                        <label for="resAuthor">&nbsp;&nbsp;&nbsp;&nbsp;Last Name: &nbsp; </label>
                        <input type = "text" id = "resAuthorLN"/>
                    </div>

                    <button id="addAdviser">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Adviser
                    </button>

                    <br/><br/>

                
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
                    
                    {/* <ResourcePrimaryInfoForm/> */}
                    
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