import React from "react";

const AbstractContainer = ({ abstract }) => {
    return (
        <div className="abstract-container">
            <h2>Abstract</h2>
            <p>{abstract}</p>
        </div>
    );
};

export default AbstractContainer;
