import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addSpThesis = (resourceData) => {
    console.log(resourceData)
    // console.log("hello sp/thesis")
    return http.post(`${apiEndpoint}/thesis/create`, resourceData, {withCredentials: true})
}

const addBook = (resourceData) => {
    console.log(resourceData)
    return http.post(`${apiEndpoint}/books/create`, resourceData, {withCredentials: true})
}

// read data of a resource
const browseSpThesis = (resourceType) => {
    return http.get(`${apiEndpoint}/thesis/browse`, resourceType, {withCredentials: true})
}

const searchSpThesis = (filter) => {
    return http.get(`${apiEndpoint}/thesis/create`, filter, {withCredentials: true})
}


// edit data of a resource



//delete resource
const deleteSpThesis = (resourceId) => {
    // console.log(resourceId)
    return http.delete(`${apiEndpoint}/thesis/remove-sp-thesis`, resourceId, {withCredentials: true})
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
    browseSpThesis,
    searchSpThesis,
    deleteSpThesis
}

export default exportFunctions;
