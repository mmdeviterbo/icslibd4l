import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addSpThesis = (resourceData) => {
    // console.log("hello sp/thesis")
    return http.post(`${apiEndpoint}/thesis/create`, resourceData, {withCredentials: true})
}

const addBook = (resourceData) => {
    // console.log(resourceData)
    return http.post(`${apiEndpoint}/books/create`, resourceData, {withCredentials: true})
}

// read data of a resource
const browseResources = (resourceType) => {
    return http.post(`${apiEndpoint}/thesis/browse`, resourceType, {withCredentials: true})
}

const searchSpThesis = (filter) => {
    return http.get(`${apiEndpoint}/thesis/create`, filter, {withCredentials: true})
}

const searchBook = (filter) => {
    return http.get(`${apiEndpoint}/book/search`, filter, {withCredentials: true})
}


// edit data of a resource
const editSpThesis = (resourceData) => {
    console.log(resourceData)
    return http.put(`${apiEndpoint}/thesis/update-sp-thesis`, resourceData, {withCredentials: true})
}

//delete resource
const deleteSpThesis = (deleteId) => {
    console.log(deleteId)
    return http.delete(`${apiEndpoint}/thesis/remove-sp-thesis/${deleteId}`, {withCredentials: true})
    // return http.delete(`${apiEndpoint}/thesis/remove-sp-thesis`, {data:{id: deleteId}, headers:{Authorization: "token"}}, {withCredentials: true})
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
    browseResources,
    searchSpThesis,
    deleteSpThesis,
    editSpThesis,
    searchBook
}

export default exportFunctions;
