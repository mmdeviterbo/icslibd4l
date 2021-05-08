import React from 'react';


class SearchResources extends React.Component{
    render(){
        return(
            <div className = "staff-search-bar-container">
                <input id = "searchbarresources"
                    placeholder = {"Search resources..."}
                />
                <button
                    id = "searchbarresbutton"
                />
            </div>
            
        );
    }
}




export default SearchResources