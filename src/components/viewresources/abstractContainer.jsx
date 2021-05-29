import React from 'react'

const AbstractContainer = ({abstract}) => {

    return(
        <div className = "abstractdiv">
            <h2>Abstract</h2>
            <p>{abstract}</p>
        </div>
    );
}

export default AbstractContainer