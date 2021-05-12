//filter field for resources
//components: div container, search filters

import React from 'react';
import Select from 'react-select';

const FiltersContainerRes = () => {
    return(
        <div className = "res-filter-container">
            <Select className = "res-filters" id = "res-category"/>  {/* if book -> authors/publisher; elif sp/thesis -> adviser (grayed out yung false)  */}
            <Select className = "res-filters" id = "res-publish-date"/>
            <Select className = "res-filters" id = "res-related-courses"/>
            <Select className = "res-filters" id = "res-author/publisher"/>
            <Select className = "res-filters" id = "res-adviser"/>
            <a id="res-filters-clear"  href = "#">Clear all filters</a>
        </div>
    )
    
};

export default FiltersContainerRes;