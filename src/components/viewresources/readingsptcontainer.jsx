import React from 'react'
import TitleAuthorHere from './title-container'
import '../../styles/viewspt/viewspt.css'
import AbstractContainer from './abstract-container'
import InfoSidebar from './side-info-container'

const ReadingSPTContainer = () => {
    return(
        <div className = "ViewSPTMainPageContainer">
            <TitleAuthorHere/>

            <div className ="abstract-and-info">
                <AbstractContainer/>
                <InfoSidebar/>
            </div>
        </div>

        // add suggestions / related content at the bottom ..?
    )
}

export default ReadingSPTContainer;