import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addSpThesis = (resourceData) => {
    console.log(resourceData)
    console.log("hello sp/thesis")
    return http.post(apiEndpoint+'/thesis/create', resourceData)
}

const addBook = (resourceData) => {
    console.log(resourceData)
    return http.post(apiEndpoint+'/books/create', resourceData)
}

// read data of a resource
const viewResource = () => {
    return http.get(apiEndpoint+'/thesis/view')
}


// edit data of a resource



//delete resource
const deleteResource = (resourceId) => {
    return http.delete(apiEndpoint+`/thesis/delete/${resourceId}`)
}


// get news from uplb news website
function getNews(){
    return http.post(`${apiEndpoint}/books/get-news`)
}





// put here your newly made functions to export, then "exportFunctions" itself will be the one to be exported
const exportFunctions = {
    getNews,
    addSpThesis,
    addBook,
    viewResource,
    deleteResource
}

export default exportFunctions;
