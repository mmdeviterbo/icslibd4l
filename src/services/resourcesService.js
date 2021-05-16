import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addResource = (resourceData) => {
    console.log("hello")
    return http.post(apiEndpoint+'/thesis/create', resourceData)
}

// read data of a resource
const viewResource = () => {
    return http.get(apiEndpoint+'/thesis/view')
}


// edit data of a resource



//delete resource




// get news from uplb news website
function getNews(){
    return http.post(`${apiEndpoint}/books/get-news`)
}





// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    getNews,
    addResource,
    viewResource
}

export default exportFunctions;
