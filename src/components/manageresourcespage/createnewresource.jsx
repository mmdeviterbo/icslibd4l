import React from 'react';

const AddNewResource = () => {
    return (
        <div className = "new-res-container">
            <a href="/add-new-resource">
            <button className = "new-res-button">

            <span class = "res-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </span>

            <span class = "res-btn-txt">
            Add New Resource
            </span>
            </button>
            </a>
        </div>
    );
}

export default AddNewResource;