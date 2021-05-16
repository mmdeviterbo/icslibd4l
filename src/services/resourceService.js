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



// export default {
//     addResource,
//     viewResource
// }

const exportFunctions = {
    addResource,
    viewResource
}

export default exportFunctions;

