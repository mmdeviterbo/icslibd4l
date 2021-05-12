import http from './httpService';
import {apiEndpoint} from '../config.json';

// add a resource details (sp/thesis, book)
const addResource = (resourceData) => {
    console.log("hello")
    return http.post(apiEndpoint+'/thesis/create', resourceData)
}

// read data of a resource
const viewResource = () => {
    http.get(apiEndpoint+'/thesis/view').then((response) => {
      return response.data
    })
}


// edit data of a resource



//delete resource



export default {
    addResource,
    viewResource
}



